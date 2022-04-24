FROM amazon/aws-lambda-nodejs:14
ADD . ${LAMBDA_TASK_ROOT}
CMD [ "app.handler" ]