//pipeline{
   //agent any
   //environment{
     // EMAIL_RECIPIENTS = 'syedabrarali346@gmail.com'
       // Tag = ${env.BUILD_NUMBER}'
   //}
 // Track stage statuses manually
pipeline{
   agent any
    environment{
      EMAIL_RECIPIENTS = 'syedabrarali346@gmail.com'
      Tag = '${env.BUILD_NUMBER}'
   }
   stages{
      stage("pre-build"){
         steps{
            sh"npx create-react-app newfrontend -y"
            dir('newfrontend') {
                sh 'npm install axios styled-components'
            }
            //sh"cd newfrontend"
            //sh"npm install axios styled-components"
            //sh"cd .."
            sh"rm ./newfrontend/src/App.js"
            //sh"rm ./newfrontend/package.json"
            sh"mv ./frontend/src/App.js ./newfrontend/src/"
            //sh"mv ./frontend/package.json ./newfrontend/"
            sh"mv ./frontend/dockerfile ./newfrontend/"
            sh"rm -r ./frontend"
            //sh"mkdir frontend"
            sh"mv newfrontend frontend"
         }
      }
      stage("Build"){
         steps{
            sh "docker build  -t front-app ./frontend"
            sh "docker build  -t back-app ./backend"
            sh "docker build  -t mysql-app ./mysql"
         }
      }
      stage("Push to ECR"){
         steps{
             withCredentials([usernamePassword(
            
            credentialsId: 'aws-cred',  // Your Jenkins credential ID
            usernameVariable: 'AWS_ACCESS_KEY_ID',
            passwordVariable: 'AWS_SECRET_ACCESS_KEY'
        )]) {
            sh '''
            aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
            aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
            aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 195275646708.dkr.ecr.ap-south-1.amazonaws.com
            docker tag back-app 195275646708.dkr.ecr.ap-south-1.amazonaws.com/syed/repo-new:${env.BUILD_NUMBER}
            docker push 195275646708.dkr.ecr.ap-south-1.amazonaws.com/syed/repo-new:${env.BUILD_NUMBER}
            '''
             }
         }
      }
      stage("Deploy"){
         steps{
            sh "docker compose down"
            sh "docker compose up -d"
         }
      }
      
   }
   post{
      always{
         emailext(
                to: EMAIL_RECIPIENTS,
                subject: "Deployment Status: ${currentBuild.currentResult}",
                body: """
                Deployment Report
                ----------------
                Job: ${env.JOB_NAME}
                Build: ${env.BUILD_NUMBER}
                Status: ${currentBuild.currentResult}
                URL: ${env.BUILD_URL}
                Duration: ${currentBuild.durationString}
                """
            )
      }
   }
}  




