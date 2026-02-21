# Creates/refreshes Windsurf compatibility mirrors (.windsurf) for rules/workflows
# Canonical source: .agents/

param(
  [string]$TargetProjectRoot = (Get-Location).Path,
  [string]$SourceRoot = ""
)

if ([string]::IsNullOrWhiteSpace($SourceRoot)) {
  $SourceRoot = Split-Path -Parent $PSScriptRoot
}

$sourceRoot = (Resolve-Path $SourceRoot).Path
$targetRoot = (Resolve-Path $TargetProjectRoot).Path
$canonicalRoot = Join-Path $sourceRoot '.agents'
$templateName = Split-Path $sourceRoot -Leaf

function Assert-Path([string]$path) {
  if (-not (Test-Path $path)) { throw "Required path not found: $path" }
}

function Ensure-Dir([string]$path) {
  if (-not (Test-Path $path)) { New-Item -ItemType Directory -Path $path | Out-Null }
}

function Ensure-Dir-Clean([string]$path) {
  if (Test-Path $path) { Remove-Item -Recurse -Force $path }
  New-Item -ItemType Directory -Path $path | Out-Null
}

function Ensure-LinkedFile([string]$path, [string]$target) {
  if (Test-Path $path) { Remove-Item -Force $path }
  try {
    New-Item -ItemType HardLink -Path $path -Target $target | Out-Null
  } catch {
    Copy-Item -Path $target -Destination $path -Force
  }
}

function Should-RemoveGit([string]$root, [string]$templateName) {
  $targetGit = Join-Path $root '.git'
  if (-not (Test-Path $targetGit)) { return $false }

  $rootName = Split-Path $root -Leaf
  return $rootName -eq $templateName
}

$canonical = @{
  agentsMd  = Join-Path $canonicalRoot 'agents.md'
  subagents = Join-Path $canonicalRoot 'subagents'
  workflows = Join-Path $canonicalRoot 'workflows'
}

Assert-Path $canonicalRoot
foreach ($target in $canonical.Values) { Assert-Path $target }

# Replicate .agents into target root
$targetAgents = Join-Path $targetRoot '.agents'
if (Test-Path $targetAgents) { Remove-Item -Recurse -Force $targetAgents }
Copy-Item -Path $canonicalRoot -Destination $targetAgents -Recurse -Force

# Ensure .codeiumignore exists with defaults
$codeiumignorePath = Join-Path $targetRoot '.codeiumignore'
$codeiumignoreContent = @"
# No .codeiumignore
.env
.cache/
__pycache__/
node_modules/
"@
Set-Content -Path $codeiumignorePath -Value $codeiumignoreContent -Encoding UTF8

# Remove local .git only when target matches template name (e.g., Code_IA_SotA)
if (Should-RemoveGit $targetRoot $templateName) {
  $targetGit = Join-Path $targetRoot '.git'
  Remove-Item -Recurse -Force $targetGit
  Write-Host ".git removed from '$targetRoot'" -ForegroundColor Yellow
} else {
  Write-Host "Keeping .git in '$targetRoot'" -ForegroundColor Yellow
}

# .windsurf (Windsurf compatibility: rules/workflows)
$windsurfRoot = Join-Path $targetRoot '.windsurf'
Ensure-Dir $windsurfRoot

# Rules: flatten global + subagents
$windsurfRules = Join-Path $windsurfRoot 'rules'
Ensure-Dir-Clean $windsurfRules
Ensure-LinkedFile (Join-Path $windsurfRules 'global-agents.md') $canonical.agentsMd
Get-ChildItem -Path $canonical.subagents -Filter '*.md' -File -ErrorAction SilentlyContinue | ForEach-Object {
  Ensure-LinkedFile (Join-Path $windsurfRules ("subagent-" + $_.Name)) $_.FullName
}

# Workflows: flatten .md
$windsurfWorkflows = Join-Path $windsurfRoot 'workflows'
Ensure-Dir-Clean $windsurfWorkflows
Get-ChildItem -Path $canonical.workflows -Filter '*.md' -File -ErrorAction SilentlyContinue | ForEach-Object {
  Ensure-LinkedFile (Join-Path $windsurfWorkflows $_.Name) $_.FullName
}

Write-Host "Windsurf mirrors refreshed in '$targetRoot' using canonical source '$canonicalRoot'" -ForegroundColor Green
