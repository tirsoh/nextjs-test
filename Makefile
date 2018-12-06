build-image:
	@echo "==> Building Docker image..."
	@docker build -t hashicorp-nextjs-test .

build:
	@echo "==> Starting build in Docker..."
	@docker run \
		--interactive \
		--rm \
		--tty \
		-w "/website" \
		--volume "$(shell pwd):/website" \
		--volume "/website/node_modules" \
		hashicorp-nextjs-test \
		npm run static

website:
	@echo "==> Starting website in Docker..."
	@docker run \
		--interactive \
		--rm \
		--tty \
		-w "/website" \
		--volume "$(shell pwd):/website" \
		--volume "/website/node_modules" \
		--publish "3000:3000" \
		hashicorp-nextjs-test \
		npm run dev

.PHONY: build website
