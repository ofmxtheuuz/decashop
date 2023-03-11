# Decashop, an easy shop application! 💸

## To run the project:

### Step 1:
First, set your environment variables in Dockerfile.mysql and Dockerfile.app (mysql comes with root user and root password by default). 

```
ENV PORT=3333
ENV SECRET_SESSION=YOUR_SECRETSESSION
ENV DB_HOST=db
ENV DB_USER=root
ENV DB_PASS=root
ENV DB_DB=decashop

ENV MERCADOPAGO_ACCESSTOKEN=YOUR_ACCESSTOKEN
ENV MERCADOPAGO_ACCESSTOKEN_TEST=YOUR_DEVELOPMENT_ACESSTOKEN

ENV NOTIFICATION_URL=https://appurl.com
```

The environment variable NOTIFICATION_URL is the URL of your application, see that this is how Mercado Pago will send payment notifications, remembering that localhost is not acceptable (this variable is not used for development, so it doesn't matter, but in production it's It is extremely important that you configure it as clearly as possible)

### Step 2:
Run the containers with docker:

```
docker-compose up
```

<i>In total, there are two containers, MySQL (3306) and Application Node 19 (3333)</i>

## OR

If you prefer, you can run

```
make
```

to remove all containers and images (DANGER! All yours containers and images in your computer will be removed) and run the containers.

### Step 3:
By default the application port is 3333, but you can change it in the environment variables as well.

### Step 4:
<bold style="font-weight: 700">Follow me on github <3</bold>
  
<hr>
  
Development with S2 by Matheus.
