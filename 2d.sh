  # apt-get install -y software-properties-common

  # add-apt-repository ppa:hugin/hugin-builds
  # add-apt-repository ppa:hugin/nightly
  # apt-get update
  # apt-get install -y hugin enblend hugin-tools

   rm -f demo.dto
   pto_gen -o demo.dto *.JPG
   hugin_executor -ad demo.dto
   hugin_executor -s demo.dto -p demo


