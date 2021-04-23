function sendemail()
{
   var result = document.getElementById('input').innerHTML;
   var link = 'mailto:'+'?subject=Message from Alekulator'
   +'&body='+'Result = '+result;
   window.location.href = link;
 }
