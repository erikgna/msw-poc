Feedback sobre dry-run:
ficou melhor separar os topicos de stub e mock em slides diferentes, mas sinto que tu comecou a explicar o MSW ali e depois volta pra explicar service worker. Pensa num story telling, inicio, meio e fim. talvez fique mais fluida a apresentacao.
a parte do what is a fetch api?  eu removeria e falaria direto o que tu falou depois que o MSW usa faz uma requisicao http real ao inves de usar uma response fake ou um simples objeto
nao precisa ler todos os titulos de cada slide, algumas coisas tu consegue "encaixar" na propria explicacao. No exemplo do Monkey Patching and Interceptors tu le o titulo e logo tu explica que no nodeJS nao tem service workers e que a solucao do MSW é usar uma biblioteca de interceptors pra fazer monkey patching. Se tu so skipar de ler o titulo ja fica mais fluido e tu ganha alguns segundos pra poder falar com mais calma
as vezes tu termina uma frase fazendo parecer que o "ponto final" é uma "virgula". Notei em poucos casos mas foi mais de uma vez, talvez seja o jeito que ta tua anotacao, eu gosto de quebrar a linha pra saber que aquela frase ta pra acabar enquanto to treinando. pra concluir o raciocinio antes de entrar em outro
teu live code ta muito focado nos testes, mas o MSW é util pra outras coisas como por exemplo o frontend começar a implementar sem que o backend esteja pronto, contanto que o contrato esteja definido. Tu pode usar uma api free e mostrar algo como:
faz uma request para um endpoint que nao existe, simulando um problema que o front ta trabalhando mas o backend ainda nao terminou
usa o MSW "depois de validar contrato com o time do backend, enquanto o backend nao esta pronto" e mostra que a request funciona e que o time de frontend é desbloqueado podendo trabalhar paralelamente.
mostra a "remocao do MSW" que nao impacta o código ja que o contrato tinha sido definido previamente.
os testes eu deixaria como secundario, acho que onde o MSW mais brilha é em tempo de desenvolvimento.
Slide When to Use  tem só um gif, poderia botar bullet points com poucas palavras e no Why to use  ta no mesmo slide ainda (so no Why to use tu ta explicando a melhor parte do MSW que é isso que comentei do dry-run
