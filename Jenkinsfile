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
      stage("Build"){
         steps{
            sh "docker build  -t front-app ./frontend"
            sh "docker build  -t back-app ./backend"
            sh "docker build  -t mysql-app ./mysql"
         }
      }
      stage("Push to ECR"){
         steps{
            sh "aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 195275646708.dkr.ecr.ap-south-1.amazonaws.com"
            sh "docker tag back-app:Tag 195275646708.dkr.ecr.ap-south-1.amazonaws.com/syed/repo-new:Tag"
            sh "docker push 195275646708.dkr.ecr.ap-south-1.amazonaws.com/syed/repo-new:Tag"
         }
      }
      stage("Deploy"){
         steps{
            sh "docker-compose -d down && up"
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




