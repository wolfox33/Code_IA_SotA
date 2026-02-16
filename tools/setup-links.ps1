# Creates/refreshes mirrors for Antigravity (.agent) and Windsurf (.windsurf)
# Default behavior:
# - Source (canonical): parent of this script (/AgentsSkillRulesWorkflows)
# - Target project: current directory

param(
  [string]$TargetProjectRoot = (Get-Location).Path,
  [string]$SourceRoot = ""
)

if ([string]::IsNullOrWhiteSpace($SourceRoot)) {
  # Script lives in /tools; canonical root is parent
  $SourceRoot = Split-Path -Parent $PSScriptRoot
}

$sourceRoot = (Resolve-Path $SourceRoot).Path
$targetRoot = (Resolve-Path $TargetProjectRoot).Path

$canonical = @{
  skills    = Join-Path $sourceRoot 'skills'
  agents    = Join-Path $sourceRoot 'Agents'
  rules     = Join-Path $sourceRoot 'Rules'
  workflows = Join-Path $sourceRoot 'workflows'
}

$mirrors = @(
  @{ base = Join-Path $targetRoot '.agent'; map = @{ skills = 'skills'; agents = 'agents'; rules = 'rules'; workflows = 'workflows' } }
)

function Assert-Canonical([string]$path) {
  if (-not (Test-Path $path)) { throw "Canonical path not found: $path" }
}

function Ensure-Dir([string]$path) {
  if (-not (Test-Path $path)) { New-Item -ItemType Directory -Path $path | Out-Null }
}

function Ensure-Junction([string]$path, [string]$target) {
  if (Test-Path $path) {
    $item = Get-Item $path -Force
    if ($item.LinkType -eq 'Junction' -and $item.Target -eq $target) { return }
    Remove-Item -Recurse -Force $path
  }
  New-Item -ItemType Junction -Path $path -Target $target | Out-Null
}

function Ensure-LinkedFile([string]$path, [string]$target) {
  if (Test-Path $path) { Remove-Item -Force $path }
  try {
    New-Item -ItemType HardLink -Path $path -Target $target | Out-Null
  } catch {
    Copy-Item -Path $target -Destination $path -Force
  }
}

foreach ($target in $canonical.Values) { Assert-Canonical $target }

$workflowFiles = Get-ChildItem -Path $canonical.workflows -Filter '*.md' -File -ErrorAction SilentlyContinue
if (-not $workflowFiles) {
  Write-Warning "No workflow .md files found in '$($canonical.workflows)'. .windsurf/workflows will be empty until you add workflows to the canonical folder."
}

foreach ($mirror in $mirrors) {
  Ensure-Dir $mirror.base
  foreach ($k in $mirror.map.Keys) {
    $target = $canonical[$k]
    $path   = Join-Path $mirror.base $mirror.map[$k]
    Ensure-Junction $path $target
  }
}

# Windsurf: criar espelho flatten para skills e rules (compatibilidade com scanner)
$windsurfRoot = Join-Path $targetRoot '.windsurf'
Ensure-Dir $windsurfRoot

function Ensure-Dir-Clean([string]$path) {
  if (Test-Path $path) { Remove-Item -Recurse -Force $path }
  New-Item -ItemType Directory -Path $path | Out-Null
}

# Flatten skills: .windsurf/skills/<skill>/SKILL.md (pasta real para detecção)
$windsurfSkills = Join-Path $windsurfRoot 'skills'
Ensure-Dir-Clean $windsurfSkills

$skillFiles = Get-ChildItem -Path $canonical.skills -Filter 'SKILL.md' -File -Recurse -ErrorAction SilentlyContinue
$seenSkillNames = @{}
foreach ($file in $skillFiles) {
  $name = $null
  $header = Get-Content -Path $file.FullName -TotalCount 20 -ErrorAction SilentlyContinue
  foreach ($line in $header) {
    if ($line -match '^name:\s*(.+)$') {
      $name = $Matches[1].Trim()
      break
    }
  }
  if ([string]::IsNullOrWhiteSpace($name)) {
    $name = $file.Directory.Name
  }
  if ($seenSkillNames.ContainsKey($name)) {
    $name = "$($file.Directory.Parent.Name)-$name" # evita colisao
  }
  $seenSkillNames[$name] = $true
  $skillDir = Join-Path $windsurfSkills $name
  Ensure-Dir $skillDir
  Ensure-LinkedFile (Join-Path $skillDir 'SKILL.md') $file.FullName

  $resources = Join-Path $file.Directory.FullName 'resources'
  if (Test-Path $resources) {
    Ensure-Junction (Join-Path $skillDir 'resources') $resources
  }
}

# Flatten rules: criar links de arquivo direto em .windsurf/rules
$windsurfRules = Join-Path $windsurfRoot 'rules'
Ensure-Dir-Clean $windsurfRules

$ruleFiles = @()
$ruleFiles += Get-ChildItem -Path (Join-Path $canonical.rules 'global') -Filter '*.md' -File -ErrorAction SilentlyContinue
$ruleFiles += Get-ChildItem -Path (Join-Path $canonical.rules 'agents') -Filter '*.md' -File -ErrorAction SilentlyContinue

foreach ($file in $ruleFiles) {
  $prefix = $file.Directory.Name
  $name = "$prefix-$($file.BaseName)$($file.Extension)"
  $dest = Join-Path $windsurfRules $name
  Ensure-LinkedFile $dest $file.FullName
}

# Flatten workflows (copiar .md em nivel direto)
$windsurfWorkflows = Join-Path $windsurfRoot 'workflows'
Ensure-Dir-Clean $windsurfWorkflows
$workflowFiles = Get-ChildItem -Path $canonical.workflows -Filter '*.md' -File -ErrorAction SilentlyContinue
foreach ($file in $workflowFiles) {
  $dest = Join-Path $windsurfWorkflows $file.Name
  Ensure-LinkedFile $dest $file.FullName
}

Write-Host "Mirrors refreshed in '$targetRoot' using source '$sourceRoot'" -ForegroundColor Green
