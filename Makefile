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