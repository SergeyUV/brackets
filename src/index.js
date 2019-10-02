/* parse_bracketsConfig
    return type of bracket
      0 - unknown, 1 - open, 2 - close, 3 - the same;
    for close bracket return its pair 
*/
function parse_bracketsConfig(bracket, bracketsConfig)
{
 /*parse bracketsConf*/
let type = -1; //0 - unknown, 1 - open, 2 - close, 3 - the same;
for(let i=0;i<bracketsConfig.length;i++){
    
  if(bracketsConfig[i][0] == bracketsConfig[i][1]){
    if(bracketsConfig[i][0] == bracket){
      return [3,''];
    }
    else{
      continue;
    }
  }
  
  if(bracketsConfig[i][0] == bracket){
    //type = 1 open;
    return([1,'']);
  }
  else if (bracketsConfig[i][1] == bracket){
    //type = 2 close ;
    return([2,bracketsConfig[i][0]]);
  }
}

return([0,'']);
}

module.exports = function check(str, bracketsConfig) {
let my_stack=[];
let my_stack_top;
for(let cursor=0;cursor<str.length;cursor++){
  let cur_bracket_type = parse_bracketsConfig(str.charAt(cursor),bracketsConfig);  
  if(cur_bracket_type[0] === 1) {
      //open bracket push to stack
      my_stack.push(str.charAt(cursor));
  } 
  else if  (cur_bracket_type[0] === 2){
    //close bracket pop from stack
    if(my_stack.length>0){
      my_stack_top = my_stack.pop();
      if(my_stack_top != cur_bracket_type[1]){
        my_stack.push(my_stack_top);
        break; //false close do not match to open
        }
      }
      else{
        my_stack.push(str.charAt(cursor));
        break; //false close before open
      }
  }
  else if(cur_bracket_type[0] === 3){ 
    //same bracket pop and compare or simple push
      if(my_stack.length>0){
        my_stack_top = my_stack.pop();
        if(my_stack_top != str.charAt(cursor)){
          my_stack.push(my_stack_top);  
          my_stack.push(str.charAt(cursor));  
        }
      }else{
        my_stack.push(str.charAt(cursor));
      }
  }
}
if(my_stack.length==0){
  return true;
  
}
else{
  return false;
}
}