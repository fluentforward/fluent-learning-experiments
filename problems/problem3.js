{
  "title" : "Exercise 3 : The string calculator in PHP",
  "descriptions" : ["For this exercise, your task is to create a class StringCalculator with a method, add, which when given a string will return the sum of all numbers within the string, where each number is separated by either a comma or a newline. If the string is empty, then 0 should be returned. "],
  "languages" : [    
    {
      "language" : "php",
      "initial" : "class StringCalculator {\n  public function add($string) {\n  }\n};",
      "after" : ["function verifyAdd($str,$expected) {$sc=new StringCalculator();$r=$sc->add($str); if ($expected !== $r) {echo 'expected ' . $expected . ', but was ' . $r; return false;};return true;};\n$res = verifyAdd('',0) && verifyAdd('3',3) && verifyAdd('2,3',5) && verifyAdd('1,2,3',6) && verifyAdd('10,9,8,7',34) && verifyAdd('1\\n2,3',6);return $res;"]
    }
  ]  
}