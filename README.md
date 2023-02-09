# Lea Record Shop

Projeto ficticio da Lea Record Shop. Uma pequena loja ficticia de discos.

## Como utilizar?

1. Instale o framework serverless em seu computador. Mais informações [aqui](https://www.serverless.com/framework/docs/getting-started)

```json
npm install -g serverless
```

2. Gere suas credenciais (AWS Acess Key e AWS Secret) na console AWS pelo IAM. Mais informações [aqui](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/)

3. Em seguida insira as credenciais e execute o comando conforme exemplo:

```json
serverless config credentials \
  --provider aws \
  --key AKIAIOSFODNN7EXAMPLE \
  --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

Também é possivel configurar via [aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) executando o comando:

```json
$ aws configure
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-east-1
Default output format [None]: ENTER
```

Após executar as instruções acima, o serverless estará pronto para ser utilizado e poderemos publicar a solução na AWS ou rodar localmente.

## Local

1. Para executar a solução acesse a pasta `lea-records` e exceute o comando

```
$ npm install
```

e em seguida:

```
$ npm run dev
```

2. Abra o browser em: http://localhost:3000

3. Exemplo:

![assets/001.png](assets/002.png)

![assets/001.png](assets/003.png)

## Deploy

1. Para efetuar o deploy da solução na sua conta aws execute (acesse a pasta `lea-records`):

```
$ serverless deploy
```

Depois de efetuar o deploy, vocẽ terá um retorno parecido com isso:

```bash
Deploying lea-records to stage dev (us-east-1)

Service deployed to stack lea-records-dev (102s)

endpoint: ANY - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/
functions:
  api: lea-records-dev-api (47 MB)
```

2. Abra o browser e confirme que a solução está funcionando colando a url

3. Exemplo:

![assets/001.png](assets/001.png)

## Testes

1. Para executar os testes desenvolvidos até o momento execute

```
$ npm run test
```

2. Exemplo:

![assets/001.png](assets/004.png)
