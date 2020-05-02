build:
	docker-compose build

up:
	docker-compose up -d

p:
	docker-compose up

down:
	docker-compose down

sh:
	docker-compose exec nuxt ash

logf:
	docker-compose logs -f --tail=100 nuxt

gcpbuild:
	docker build -t gcr.io/bring-list-client/bring-list-client ./nuxt
gcppush:
	docker push gcr.io/bring-list-client/bring-list-client:latest