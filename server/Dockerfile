FROM public.ecr.aws/lambda/nodejs:18

# COPY . .

COPY package*.json ${LAMBDA_TASK_ROOT}/

RUN npm install --legacy-peer-deps

COPY . ${LAMBDA_TASK_ROOT}

RUN npm run build

RUN npx prisma generate

CMD [ "dist/lambda.handler" ]