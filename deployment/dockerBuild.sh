COMMIT_ID=$(git rev-parse --short=7 HEAD)
TAG_VERSION="latest"
SERVICE_NAME=$1

if [[ ! -z ${SERVICE_NAME} ]]
then
    DOCKER_REPO_NAME="013719935964.dkr.ecr.us-east-1.amazonaws.com"

    if [ ${SERVICE_NAME} == "okl-ui-bld-image" ]
    then
    DOCKER_BUILD_COMMAND="docker build -t ${SERVICE_NAME}:${TAG_VERSION} -f ./deployment/Dockerfile.okluibld ."
    fi

    DOCKER_TAG_COMMAND="docker tag ${SERVICE_NAME}:${TAG_VERSION} ${DOCKER_REPO_NAME}/${SERVICE_NAME}:${COMMIT_ID}"
    DOCKER_PUSH_COMMAND="docker push ${DOCKER_REPO_NAME}/${SERVICE_NAME}:${COMMIT_ID}"

    echo "Building image for commitId: ${COMMIT_ID}, ${DOCKER_BUILD_COMMAND} "

    $DOCKER_BUILD_COMMAND

    echo "Tagging image: ${DOCKER_TAG_COMMAND}"
    $DOCKER_TAG_COMMAND

    echo "Pushing the image to the repository: ${DOCKER_PUSH_COMMAND}"
    $DOCKER_PUSH_COMMAND


else
    echo "Please provide the valid service name'"
fi
