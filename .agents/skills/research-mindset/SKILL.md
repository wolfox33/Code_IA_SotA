---
name: research-mindset
description: "Use ao iniciar um novo ciclo de pesquisa, ao reformular direção, ou ao sentir que está reagindo a tendências (arXiv, Twitter, grupo) em vez de escolher problemas deliberadamente. Orienta o mindset, a velocidade e a honestidade do processo de pesquisa — não a técnica."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "methodological"
  complexity: 3
  status: active
  tags:
    - research
    - mindset
    - deliberate-practice
    - taste
    - learning
---

# SKILL: Research Mindset

## Objetivo

Transformar pesquisa de uma atividade reativa (absorver problemas do ambiente) em uma atividade deliberada (escolher problemas, treinar gosto, apertar o loop, aprender com falhas). Esta skill não substitui o conhecimento técnico — ela governa como você o aplica.

## Use this skill when

- Você está prestes a iniciar um novo ciclo de pesquisa e não tem clareza sobre por que este problema e não outro.
- Você sente que está seguindo o que todo mundo está fazendo (arXiv trending, threads, anúncios de laboratórios).
- Você quer melhorar a velocidade do seu loop de experimentação sem sacrificar rigor.
- Um experimento falhou e você quer extrair máximo aprendizado dele, não apenas arquivar.
- Você está considerando mudar de subcampo ou expandir escopo.
- Você sente que seus resultados não traduzem em progresso real — "estou ocupado, mas não estou avançando".

## Do not use this skill when

- A tarefa for puramente técnica (implementar um modelo, ajustar um hiperparâmetro, corrigir um bug). Use a skill técnica adequada (`quant`, `ml`, `data-science`, etc.).
- A tarefa for de revisão de código, refatoração ou manutenção.
- O problema já está claramente definido e a questão é apenas execução.

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- **Justificativa do problema:** Por que este problema e não outro? Qual resultado você quer que exista? (Formato: "Se [X], então [Y], porque [mecanismo]")
- **Expectativa explícita:** Previsão do resultado antes de rodar o experimento (AUC, Sortino, Calmar, DSR, direção, qualquer métrica relevante).
- **Research Log:** Entrada datada com: hipótese → setup → expectativa → resultado → crença atualizada.
- **Análise de falhas (quando aplicável):** Casos de falha, cauda estranha, transcrições de comportamento inesperado — não apenas métrica agregada.
- **Decisão clara:** Iterar (com o quê), promover, ou arquivar — com justificativa de por que não o contrário.

## Procedure

### 1. Escolha seus próprios problemas

Não absorva problemas do ambiente. A pergunta de Hamming: "Quais são os problemas importantes da sua área, e por que você não está trabalhando neles?"

- **Método de Schulman:** Divida o trabalho em dois modos:
  1. **Modo caça:** Ler a literatura e procurar coisas para melhorar.
  2. **Modo objetivo:** Escolher um resultado que você realmente quer que exista e raciocinar de trás para frente até os experimentos.
- **Defenda o modo 2.** Ele fabrica originalidade. Um objetivo que você realmente se importa vai te arrastar para territórios que nenhum survey cobre.
- **Evite problemas na moda.** Quando um laboratório famoso anuncia uma direção, você descobre um ano depois que eles pivotaram. E você corre contra mil pessoas que começaram antes e têm mais compute.

### 2. Treine seu gosto (taste) como músculo

O gosto não é um dom. É um modelo interno treinado por previsão + correção.

- **Preveja o resultado de todo experimento antes de rodá-lo.** Registre a previsão. Compare com o real. Anote o delta.
- **Cobre a seção de resultados de um paper e tente adivinhar os números só pelo método.** Anote sua previsão. Verifique. Calcule sua taxa de acerto.
- **Anote quais lançamentos deste mês ainda vão importar daqui a dois anos.** Depois confira.
- **Uma previsão + correção, repetida algumas centenas de vezes, é como todo bom modelo é treinado — inclusive o que está na sua cabeça.**

### 3. Melhore suas entradas (diet informacional)

Listas de leitura compartilhadas produzem ideias compartilhadas. Se sua dieta é arXiv trending + group chat, você chegará às mesmas conclusões que todo mundo, no mesmo momento — o que torna essas conclusões sem valor.

- **Material antigo está absurdamente subprecificado.** Mixture of Experts é de 1991. LSTMs de 1997. Backprop de 1986. Richard Sutton precisou de cerca de mil palavras em 2019 para escrever "The Bitter Lesson", e ele prevê o formato do campo melhor que surveys dez vezes maiores.
- **Leia fora da bolha.** Interpretabilidade rouba da neurociência. Design de eval é mechanism design vestindo jaleco. Estatística honesta talvez seja a habilidade mais rara em ML.
- **Leia o paper de verdade, não o thread.** O apêndice é onde os corpos estão enterrados. A seção de limitações costuma ser o parágrafo mais honesto do documento.
- **Claude Shannon (1952):** O primeiro movimento do pensamento criativo é encolher o problema até ele ficar quase trivial, resolver a versão pequena, e depois reintroduzir a dificuldade peça por peça. Esse truque sozinho te leva através de mais paredes do que qualquer conselho moderno de produtividade.

### 4. Escreva tudo

Uma ideia pode parecer completamente formada até você tentar colocá-la em palavras. A página encontra as lacunas que sua cabeça esconde.

- **Regra de Feynman:** A primeira pessoa que você não pode enganar é você mesmo. Escrever é a defesa mais barata já inventada.
- **Procedimento de Darwin:** Qualquer fato que contrariasse sua teoria era escrito na hora. Ele percebeu que sua própria memória deletava evidências inconvenientes mais rápido que as convenientes. Sua memória faz a mesma coisa com seus experimentos que falharam.
- **Mantenha um Research Log:**
  - Hipótese
  - Setup
  - Expectativa (previsão antes de rodar)
  - Resultado
  - Crença atualizada (o que mudou na sua convicção)
- **Reler as entradas do mês passado é humilhante de um jeito que nenhum reviewer consegue igualar.**
- **Coloque parte disso em público.** Uma explicação clara é uma contribuição genuína. Muita gente descobriu campos através de posts legíveis, não de papers de conferência. Um corpo de escrita pública é a credencial mais forte que você pode ter — é uma amostra impossível de falsificar de como você pensa.

### 5. Aperte o loop

As histórias sobre pesquisadores produtivos raramente envolvem um único golpe de gênio. Elas envolvem volume: mais runs por dia, mais ideias erradas descartadas por semana, um modelo de realidade que atualiza mais rápido.

- **A velocidade da pesquisa é a velocidade com que você descobre que está errado.**
- **Toda ferramenta deve ser um comando.** Lançar um run tem que ser um comando. Plotar tem que ser mais um. Comparar dois runs deve levar segundos, não uma tarde de arqueologia.
- **Overfitar um único batch antes de treinar em escala.** (Karpathy) Trinta segundos e metade dos bugs desaparecem. Encolha tudo até ficar barato, acerte, depois gaste o compute.
- **Engenharia não é parceiro júnior.** Na fronteira, pesquisa e engenharia se fundiram. O pesquisador que consegue construir o harness, o eval e o pipeline de dados é aquele cujas hipóteses realmente são testadas. Todo o resto fica na fila.

### 6. Olhe para os outputs (especialmente as falhas)

Uma curva de loss descendente não é análise, é consolo. Seus experimentos geram muito mais informação do que você consome.

- **Pegue cem falhas, leia todas, organize em pilhas, ataque a maior pilha.** (Andrew Ng) Funciona para modelos e funciona para evals.
- **Uma única transcrição de comportamento genuinamente estranho te ensina mais que o próximo decimal de acurácia.**
- **Um benchmark que você nunca leu as transcrições é um benchmark que você não entende de verdade.**
- **Gaste horas manualmente nos dados crus antes de escrever código de treinamento.** (Karpathy) A maioria dos bugs de ML mora nos dados, e eles falham silenciosamente. Nada crasha. Você simplesmente ganha um modelo medíocre e uma teoria errada sobre o motivo.

### 7. Ande de propósito

Seu primeiro subcampo é um acidente de timing. Trate como tal.

- **Passe tempo real em múltiplos subcampos** (interpretabilidade, evals, RL, systems) antes de decidir onde vai morar. Em algum lugar existe um canto onde sua estranheza específica é uma vantagem injusta.
- **Rode a versão descartável de toda ideia primeiro e deixe a maioria morrer jovem.**
- **Ajuste seus baselines até doer.** O cemitério de ML está cheio de ganhos que evaporaram contra um baseline bem tunado. Um reviewer é a pior pessoa possível para aprender isso.
- **Faça ablação até saber qual componente carrega o resultado.** Geralmente é um, e geralmente não é o que está no título.
- **Alcance é seguro.** Subcampos saturam. As pessoas que continuam produzindo nas transições são aquelas que já sabem se virar no território vizinho.

### 8. Encontre suas pessoas (generosidade)

Hamming notou que colegas de porta aberta faziam o trabalho que importava, porque as interrupções carregavam informação sobre o que o mundo realmente precisava.

- **Replique um resultado e publique o que encontrou.**
- **Libere a ferramenta que você construiu para si mesmo.**
- **Explique algo difícil em linguagem clara.**
- **Solte ideias meio formadas em público.** Errar no timeline é muito mais barato que errar no paper.
- **O colaborador que te diz que uma ideia é ruim antes de você afundar três meses nela vale mais que compute.** Essa relação não se compra, só se conquista.
- **Os retornos chegam de lado, meses depois, na forma de colaboração, referência ou cargo.**

### 9. Jogue o jogo longo

Pasteur: "A sorte favorece a mente preparada." Hamming: conhecimento e produtividade se compostam como juros.

- **As vantagens diárias parecem triviais isoladas.** O que você lê, o que registra, a velocidade do seu loop, com quem você discute.
- **Dê alguns anos e elas produzem carreiras que parecem sorte vista de fora.**
- **Comece a compor antes do que parece necessário.** O "você do futuro" já sabe que essa era a parte barata.

## Verification

- [ ] O problema foi escolhido, não absorvido do ambiente (arXiv trending, laboratório, thread)
- [ ] Existe uma justificativa clara de por que este problema e não outro
- [ ] A expectativa foi registrada antes de olhar resultados (previsão antes de execução)
- [ ] O Research Log contém: hipótese, setup, expectativa, resultado, crença atualizada
- [ ] Falhas foram analisadas além da métrica agregada (cauda, transcrições, casos de falha)
- [ ] A decisão é explícita: iterar, promover, ou arquivar — com justificativa
- [ ] O ciclo foi encolhido até ficar barato antes de escalar (overfitar um batch, versão descartável)
- [ ] Baselines foram ajustados antes de declarar vitória
- [ ] A velocidade do loop foi considerada: ferramentas, reprodutibilidade, comparação em segundos

> **Skill log**
> - [2026-06-14] Criada a partir de orientação de research do usuário: foco em escolha de problemas, gosto, diet informacional, escrita, velocidade, análise de falhas, propósito, generosidade e jogo longo.
