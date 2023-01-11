CURRENT_DIR = $(shell pwd)

deploy:
	@echo Deploying
	@sls deploy --stage prd --verbose 

install_tools:
	@echo Installing tools
	@npm i -D

test:
	@echo Testing
	@npm test