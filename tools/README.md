# Tools

## materialize-agent-compat.ps1
Cria/atualiza artefatos de compatibilidade para múltiplos agentes, usando `AGENTS.md` na raiz como fonte global e `.agents/` como fonte modular.

### O que faz
- Usa `AGENTS.md` como fonte global de regras sempre ativas.
- Usa `.agents/` como fonte modular (`skills/`, `subagents/`, `workflows/`).
- Materializa compatibilidade física para:
  - `.windsurf/`
  - `.claude/`
  - `.opencode/`
- Gera manifests leves em `.agents-runtime/` para:
  - `antigravity`
  - `goose`
  - `hermes`
  - `pi`
- Recria apenas os artefatos das plataformas selecionadas.

### Como rodar
```powershell
powershell -ExecutionPolicy Bypass -File tools/materialize-agent-compat.ps1
```

Exemplo selecionando plataformas:

```powershell
powershell -ExecutionPolicy Bypass -File tools/materialize-agent-compat.ps1 -Platforms windsurf,claude,goose
```

### Usar em outro projeto (ex.: Bagual)
Execute o script pelo caminho absoluto, com terminal aberto na raiz do projeto alvo:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Code\AgentsSkillRulesWorkflows\tools\materialize-agent-compat.ps1
```

Opcionalmente, informe explicitamente o alvo:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Code\AgentsSkillRulesWorkflows\tools\materialize-agent-compat.ps1 -TargetProjectRoot C:\Code\Bagual
```

### Comando genérico (independente da pasta atual)
Se você sempre clonar `AgentsSkillRulesWorkflows` dentro do projeto (ex.: `./AgentsSkillRulesWorkflows`), rode de qualquer pasta:

```powershell
powershell -ExecutionPolicy Bypass -File (Resolve-Path .\AgentsSkillRulesWorkflows\tools\materialize-agent-compat.ps1) -TargetProjectRoot (Get-Location).Path
```

### Parâmetros
- `-TargetProjectRoot`: raiz do projeto onde `.windsurf` será criado.
- `-SourceRoot`: raiz do repositório template (onde existem `AGENTS.md` e `.agents/`).
- `-Platforms`: lista de plataformas suportadas. Valores aceitos: `windsurf`, `claude`, `opencode`, `antigravity`, `goose`, `hermes`, `pi`.
- `-RemoveGitWhenBootstrappingTemplate`: remove `.git` apenas quando usado explicitamente em cenário de bootstrap de template.

### Requisitos
- Windows com PowerShell
- Permissão para criar Junction (não precisa modo desenvolvedor)

### Verificar
```powershell
Get-Item .windsurf\* | Select-Object FullName, LinkType, Target
```

### Observações
- Junctions não são versionados pelo Git. Após clonar em outra máquina, rode o script novamente para recriar os espelhos.
- Edite regras globais em `AGENTS.md`.
- Edite conteúdo modular em `.agents/`.
- Os espelhos apenas materializam compatibilidade.
- `Windsurf`, `Claude` e `OpenCode` recebem artefatos físicos.
- `Antigravity`, `Goose`, `Hermes` e `pi` recebem manifests leves, pois a estratégia atual é quase nativa ou orientada a runtime.
