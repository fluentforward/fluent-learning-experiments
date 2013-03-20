{
  "title" : "Exercise 3 : The string calculator in PHP",
  "descriptions" : ["For this exercise, your task is to create a function, which when given an input word and a list of words will return a count of the number of words from the word list which are an anagram of the input word."],
  "languages" : [    
    {
      "language" : "php",
      "initial" : "class StringCalculator {\n  public function add($string) {\n  }\n};",
      "after" : ["function verifyAdd($str,$expected) {$sc=new StringCalculator();$r=$sc->add($str); if ($expected !== $r) {echo 'expected ' . $expected . ', but was ' . $r; return false;};return true;};\n$res = verifyAdd('',0) && verifyAdd('3',3) && verifyAdd('2,3',5) && verifyAdd('1,2,3',6) && verifyAdd('10,9,8,7',34) && verifyAdd('1\\n2,3',6);return $res;"]
    }
  ]  
}