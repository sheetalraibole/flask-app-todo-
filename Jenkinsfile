pipeline{
   agent any
   environment{
      EMAIL_RECIPIENTS = 'syedabrarali346@gmail.com'
   }
   stages{
     stage("build"){
       steps {
           echo "sucess"  
         }
     }
     stage("test"){
       steps {
          echo "test"
         }
     }
     stage("artifacts"){
       steps {
          echo "ecr"
         }
     }
     stage("deploy"){
       steps {
         echo "deploy"
         }
     }
   }
   post{
      always{
         emailext(subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}",
                body: """<p>Build ${currentBuild.currentResult}: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}</p>
                        <p>Check console output at <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                        <p>Build Stages:</p>
                        <ul>${currentBuild.rawBuild.getStages().collect { "<li>${it.name}: ${it.result}</li>" }.join('')}</ul>""",
                to: 'your-email@example.com',
                recipientProviders: [[$class: 'DevelopersRecipientProvider']]
                 )
         cleanWs()
      }
   }
}
