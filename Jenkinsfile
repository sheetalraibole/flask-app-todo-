pipeline{
   agent any
   environment{
      EMAIL_RECIPIENTS = 'syedsyedsyed10001@gmail.com'
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
         emailext(subject:"Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}",
                 body:"""<p>Build Result: ${currentBuild.currentResult}</p>
                    <p>Build URL: ${env.BUILD_URL}</p>
                    <p>Console Output: ${env.BUILD_URL}console</p>""",
                 to:EMAIL_RECIPIENTS,
                 recipientProviders:[[$class: 'DevelopersRecipientProvider']],
                 mimeType: 'text/html'
                 )
         cleanWs()
      }
   }
}
