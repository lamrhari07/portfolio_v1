Jenkinsfile (Declarative Pipeline)
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'docker-compose run web python manage.py makemigrations'
                sh 'docker-compose run web python manage.py migrate'
            }
        }
        stage('Run') {
            steps {
                echo 'Running..'
                sh 'docker-compose run'
            }
        }
        stage('Run2') {
            steps {
                echo 'Soon..'
            }
        }
    }
}