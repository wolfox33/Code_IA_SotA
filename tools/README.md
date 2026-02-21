# Tools

## setup-links.ps1
Cria/atualiza espelhos mínimos do Windsurf (`.windsurf/`) para **rules** e **workflows**, usando `.agents/` como fonte canônica.

### O que faz
- Usa `.agents/` como fonte de verdade (`agents.md`, `subagents/`, `workflows/`).
- Gera `.windsurf/rules/` a partir de `agents.md` + `subagents/`.
- Gera `.windsurf/workflows/` a partir de `workflows/`.
- Recria os espelhos quando necessário.

### Como rodar
```powershell
powershell -ExecutionPolicy Bypass -File tools/setup-links.ps1
```

### Usar em outro projeto (ex.: Bagual)
Execute o script pelo caminho absoluto, com terminal aberto na raiz do projeto alvo:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Code\AgentsSkillRulesWorkflows\tools\setup-links.ps1
```

Opcionalmente, informe explicitamente o alvo:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Code\AgentsSkillRulesWorkflows\tools\setup-links.ps1 -TargetProjectRoot C:\Code\Bagual
```

### Comando genérico (independente da pasta atual)
Se você sempre clonar `AgentsSkillRulesWorkflows` dentro do projeto (ex.: `./AgentsSkillRulesWorkflows`), rode de qualquer pasta:

```powershell
powershell -ExecutionPolicy Bypass -File (Resolve-Path .\AgentsSkillRulesWorkflows\tools\setup-links.ps1) -TargetProjectRoot (Get-Location).Path
```

### Parâmetros
- `-TargetProjectRoot`: raiz do projeto onde `.windsurf` será criado.
- `-SourceRoot`: raiz do repositório template (onde existe `.agents/`).

### Requisitos
- Windows com PowerShell
- Permissão para criar Junction (não precisa modo desenvolvedor)

### Verificar
```powershell
Get-Item .windsurf\* | Select-Object FullName, LinkType, Target
```

### Observações
- Junctions não são versionados pelo Git. Após clonar em outra máquina, rode o script novamente para recriar os espelhos.
- Edite SEMPRE na pasta canônica `.agents/`; os espelhos apenas materializam compatibilidade.
