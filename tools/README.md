# Tools

## setup-links.ps1
Cria/atualiza junctions para espelhar a estrutura canônica em `.agent/` (Antigravity) e `.windsurf/` (Windsurf).

### O que faz
- Garante que `.agent` e `.windsurf` tenham links para:
  - `skills/`
  - `Agents/`
  - `Rules/`
  - `workflows/` (incluído em ambos)
- Remove e recria o junction se já existir com alvo diferente.

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

### Requisitos
- Windows com PowerShell
- Permissão para criar Junction (não precisa modo desenvolvedor)

### Verificar
```powershell
Get-Item .agent\* , .windsurf\* | Select-Object FullName, LinkType, Target
```

### Observações
- Junctions não são versionados pelo Git. Após clonar em outra máquina, rode o script novamente para recriar os espelhos.
- Edite SEMPRE na pasta canônica (`skills/`, `Agents/`, `Rules/`, `workflows/`); os espelhos só apontam para lá.
- Se `workflows/` estiver vazio, `.windsurf/workflows` também ficará vazio (por ser espelho). Adicione os arquivos `.md` de workflow na pasta canônica `workflows/`.
