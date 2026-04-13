# Creates/refreshes compatibility artifacts for supported agent surfaces
# Canonical sources: AGENTS.md + .agents/

param(
  [string]$TargetProjectRoot = (Get-Location).Path,
  [string]$SourceRoot = "",
  [string[]]$Platforms = @('windsurf'),
  [switch]$RemoveGitWhenBootstrappingTemplate
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

function Same-Path([string]$left, [string]$right) {
  $leftFull = [System.IO.Path]::GetFullPath($left)
  $rightFull = [System.IO.Path]::GetFullPath($right)
  return [System.StringComparer]::OrdinalIgnoreCase.Equals($leftFull, $rightFull)
}

function Copy-DirectoryContents([string]$sourceDir, [string]$destinationDir) {
  Ensure-Dir-Clean $destinationDir
  Get-ChildItem -Path $sourceDir -Force -ErrorAction SilentlyContinue | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination $destinationDir -Recurse -Force
  }
}

function Normalize-Platforms([string[]]$platforms) {
  $aliases = @{
    'windsurf' = 'windsurf'
    'claude' = 'claude'
    'claude-code' = 'claude'
    'opencode' = 'opencode'
    'antigravity' = 'antigravity'
    'goose' = 'goose'
    'hermes' = 'hermes'
    'hermes-agent' = 'hermes'
    'pi' = 'pi'
  }

  $normalized = New-Object System.Collections.Generic.List[string]
  foreach ($platform in $platforms) {
    $key = $platform.Trim().ToLowerInvariant()
    if (-not $aliases.ContainsKey($key)) {
      throw "Unsupported platform '$platform'. Supported values: windsurf, claude, opencode, antigravity, goose, hermes, pi"
    }

    $value = $aliases[$key]
    if (-not $normalized.Contains($value)) {
      [void]$normalized.Add($value)
    }
  }

  return $normalized.ToArray()
}

$canonical = @{
  rootAgents = Join-Path $sourceRoot 'AGENTS.md'
  subagents = Join-Path $canonicalRoot 'subagents'
  workflows = Join-Path $canonicalRoot 'workflows'
  skills    = Join-Path $canonicalRoot 'skills'
}

$selectedPlatforms = Normalize-Platforms $Platforms

Assert-Path $canonicalRoot
foreach ($target in $canonical.Values) { Assert-Path $target }

# Replicate .agents into target root when source and target differ
$targetAgents = Join-Path $targetRoot '.agents'
$shouldCopyAgents = -not (Same-Path $canonicalRoot $targetAgents)
if ($shouldCopyAgents) {
  if (Test-Path $targetAgents) { Remove-Item -Recurse -Force $targetAgents }
  Copy-Item -Path $canonicalRoot -Destination $targetAgents -Recurse -Force
} else {
  Write-Host "Skipping .agents replication because source and target are the same directory" -ForegroundColor Yellow
}

# Ensure AGENTS.md exists in target root from the root canonical file
$agentsLink = Join-Path $targetRoot 'AGENTS.MD'
$agentsTarget = $canonical.rootAgents

if (-not (Same-Path $agentsLink $agentsTarget)) {
  if (Test-Path $agentsLink) { Remove-Item -Force $agentsLink }

  try {
    New-Item -ItemType SymbolicLink -Path $agentsLink -Target $agentsTarget -ErrorAction Stop | Out-Null
  } catch {
    try {
      New-Item -ItemType HardLink -Path $agentsLink -Target $agentsTarget -ErrorAction Stop | Out-Null
    } catch {
      Copy-Item -Path $agentsTarget -Destination $agentsLink -Force
    }
  }
} else {
  Write-Host "Keeping root AGENTS.md in place because source and target are the same file" -ForegroundColor Yellow
}

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

# Remove local .git only when explicitly requested for template bootstrapping
if ($RemoveGitWhenBootstrappingTemplate -and (Should-RemoveGit $targetRoot $templateName)) {
  $targetGit = Join-Path $targetRoot '.git'
  Remove-Item -Recurse -Force $targetGit
  Write-Host ".git removed from '$targetRoot'" -ForegroundColor Yellow
} else {
  Write-Host "Keeping .git in '$targetRoot'" -ForegroundColor Yellow
}

function Materialize-Windsurf() {
  $windsurfRoot = Join-Path $targetRoot '.windsurf'
  Ensure-Dir $windsurfRoot

  $windsurfSkills = Join-Path $windsurfRoot 'skills'
  Ensure-Dir-Clean $windsurfSkills
  Get-ChildItem -Path $canonical.skills -Directory -ErrorAction SilentlyContinue | ForEach-Object {
    $skillFile = Join-Path $_.FullName 'SKILL.md'
    if (Test-Path $skillFile) {
      Ensure-LinkedFile (Join-Path $windsurfSkills ($_.Name + '.md')) $skillFile
    }
  }

  $windsurfRules = Join-Path $windsurfRoot 'rules'
  Ensure-Dir-Clean $windsurfRules
  Ensure-LinkedFile (Join-Path $windsurfRules 'global-agents.md') $canonical.rootAgents
  Get-ChildItem -Path $canonical.subagents -Filter '*.md' -File -ErrorAction SilentlyContinue | ForEach-Object {
    Ensure-LinkedFile (Join-Path $windsurfRules ("subagent-" + $_.Name)) $_.FullName
  }

  $windsurfWorkflows = Join-Path $windsurfRoot 'workflows'
  Ensure-Dir-Clean $windsurfWorkflows
  Get-ChildItem -Path $canonical.workflows -Filter '*.md' -File -ErrorAction SilentlyContinue | ForEach-Object {
    Ensure-LinkedFile (Join-Path $windsurfWorkflows $_.Name) $_.FullName
  }

  Write-Host "Windsurf compatibility refreshed in '$targetRoot'" -ForegroundColor Green
}

function Materialize-Claude() {
  $claudeRoot = Join-Path $targetRoot '.claude'
  Ensure-Dir $claudeRoot

  $claudeAgents = Join-Path $claudeRoot 'AGENTS.md'
  Ensure-LinkedFile $claudeAgents $canonical.rootAgents

  $claudeSkills = Join-Path $claudeRoot 'skills'
  Ensure-Dir-Clean $claudeSkills
  Get-ChildItem -Path $canonical.skills -Directory -ErrorAction SilentlyContinue | ForEach-Object {
    $targetDir = Join-Path $claudeSkills $_.Name
    Ensure-Dir $targetDir
    $skillFile = Join-Path $_.FullName 'SKILL.md'
    if (Test-Path $skillFile) {
      Ensure-LinkedFile (Join-Path $targetDir 'SKILL.md') $skillFile
    }
  }

  Write-Host "Claude compatibility refreshed in '$targetRoot'" -ForegroundColor Green
}

function Materialize-OpenCode() {
  $opencodeRoot = Join-Path $targetRoot '.opencode'
  Ensure-Dir $opencodeRoot

  $opencodeSkills = Join-Path $opencodeRoot 'skills'
  Ensure-Dir-Clean $opencodeSkills
  Get-ChildItem -Path $canonical.skills -Directory -ErrorAction SilentlyContinue | ForEach-Object {
    $targetDir = Join-Path $opencodeSkills $_.Name
    Ensure-Dir $targetDir
    $skillFile = Join-Path $_.FullName 'SKILL.md'
    if (Test-Path $skillFile) {
      Ensure-LinkedFile (Join-Path $targetDir 'SKILL.md') $skillFile
    }
  }

  Write-Host "OpenCode compatibility refreshed in '$targetRoot'" -ForegroundColor Green
}

function Write-Manifest([string]$platform, [string[]]$lines) {
  $runtimeRoot = Join-Path $targetRoot '.agents-runtime'
  Ensure-Dir $runtimeRoot
  $manifestPath = Join-Path $runtimeRoot ($platform + '.md')
  Set-Content -Path $manifestPath -Value ($lines -join [Environment]::NewLine) -Encoding UTF8
  Write-Host "$platform compatibility manifest generated in '$manifestPath'" -ForegroundColor Green
}

function Materialize-Antigravity() {
  Write-Manifest 'antigravity' @(
    '# Antigravity Compatibility',
    '',
    '- Global entrypoint: `AGENTS.md`',
    '- Skills source: `.agents/skills/`',
    '- Subagents source: `.agents/subagents/`',
    '- Workflows source: `.agents/workflows/`',
    '- Status: near-native compatibility, no physical mirror required right now.'
  )
}

function Materialize-Goose() {
  Write-Manifest 'goose' @(
    '# Goose Compatibility',
    '',
    '- Global entrypoint: `AGENTS.md`',
    '- Canonical modular source: `.agents/`',
    '- Recommended runtime layer: recipes, MCP, ACP and sandbox policies.',
    '- Status: runtime/orchestration target; manifest generated instead of directory mirror.'
  )
}

function Materialize-Hermes() {
  Write-Manifest 'hermes' @(
    '# Hermes Compatibility',
    '',
    '- Global entrypoint: `AGENTS.md`',
    '- Portable skills source: `.agents/skills/`',
    '- Status: portable-skill consumer; no dedicated mirror required right now.'
  )
}

function Materialize-Pi() {
  Write-Manifest 'pi' @(
    '# pi Compatibility',
    '',
    '- Global entrypoint: `AGENTS.md`',
    '- Canonical modular source: `.agents/`',
    '- Recommended approach: lightweight adapters/extensions instead of full directory mirroring.',
    '- Status: experimental lightweight target.'
  )
}

foreach ($platform in $selectedPlatforms) {
  switch ($platform) {
    'windsurf' { Materialize-Windsurf }
    'claude' { Materialize-Claude }
    'opencode' { Materialize-OpenCode }
    'antigravity' { Materialize-Antigravity }
    'goose' { Materialize-Goose }
    'hermes' { Materialize-Hermes }
    'pi' { Materialize-Pi }
    default { throw "Unhandled platform '$platform'" }
  }
}

Write-Host "Compatibility generation finished for: $($selectedPlatforms -join ', ')" -ForegroundColor Green
