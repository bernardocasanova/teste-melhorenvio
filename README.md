# Desafio Backend Melhor Envio

### Configuraçao

1. Primeiro passo é fazer o clone da aplicaçao, logo após efetuar o download do arquivo de logs e coloca-lo na pasta `src/extras/logs`.
  - Link para clone da aplicaçao: https://github.com/bernardocasanova/teste-melhorenvio
  - Link para download do arquivo de logs: https://drive.google.com/file/d/1b9mpy5fXb3yQwcRDu03-pTBA2QCcLLTK

2. O segundo passo é a configuraçao das variaveis de ambiente:
  - Estara a disposiçao na raiz do projeto um arquivo chamado `.env.example`, neste arquivo contem a configuraçao basica/padrao para a utilizacao do ambiente de desenvolvimento. Basta remover o ".example" e as variaveis de ambiente estarao funcionais.
  - A variavel de ambiente da porta esta pre definida com o valor `3000`, porem caso haja necessidade/vontade é só alterar a mesma.
  - A variavel de ambiente do host esta pré definido com o valor `mongodb`.

3. Necessaria a instalaçao do Docker, pois foi utilizado para criaçao e administraçao do ambiente de desenvolvimento.

4. Acessar via terminal a pasta em que a aplicaçao se encontra e executar o seguinte comando: `docker-compose up -d`

4.1. Apos esta etapa a aplicaçao estara funcional

5. A aplicacao tera 2 endpoints ambos do tipo `POST`:

  - O primeiro endpoint `/import` sera o responsavel pela importaçao do arquivo "logs.txt"
    - O arquivo "logs.txt" precisa estar localizado na pasta `src/extras/logs/logs.txt`.
  - O segundo endpoint `/export` sera o responsavel pela exportaçao dos 3 arquivos ".csv" descritos abaixo:
    - Arquivo 1: `AverageTimeService.csv`. Neste arquivo estara o tempo médio de `request`, `proxy` e `kong` por serviço.
    - Arquivo 2: `RequestsByService.csv`. Neste arquivo estara todas as requisiçoes por serviço.
    - Arquivo 3: `RequestsByConsumer.csv`. Neste arquivo estara todas as requisiçoes por consumidor.

6. Para definirmos a url de acesso a aplicaçao precisamos verificar o host e a porta no arquivo .env
  - A porta padrao pré-configurada é a porta `3000`.
  - O host padrao pré-configurado é `mongodb` (este host é o link da nossa maquina local com o Docker).
  - Neste caso a URL de acesso a apliçao ficará: http://localhost:3000

7. Para acessar a aplicaçao indico utilizar um Api/Client (ex: Insomnia).
  - Ao acessar via API/Client basta colocar a URL e o endpoint desejado. Ex: http://localhost:3000/import.
  - Para efetuar a importaçao do arquivo logs.txt, devemos enviar uma requisiçao via `POST` ao endpoint: http://localhost:3000/import.
  - Para efetuar a exportaçao do arquivo e gerar os 3 arquivos "csv", devemos enviar uma requisiçao via POST ao endpoint: http://localhost:3000/export.
  - Os relatórios estarao disponiveis na pasta `src/extras/exports`.

### Consideraçoes

Agradeço pela oportunidade, achei demais o teste! Espero que curtam!
