# tslint-multi-line-import
## Setup

    npm i multiline-import
  
  Than add multiline-import to your rulesDirectory in tslint.config, for example, path to package inside node_modules.
  On the other hand you can copy rule to your custom directory.
  
    {
      ...
      "rulesDirectory": ["./node_modules/multiline-import/dist"],
      ...
    }
  
## Usage

    "multiline-import": true // 2 named imports is default
    
  Correct:
  
    import {a} from 'test';
    
   
    import {
      a,
      b,
    } from 'test';
    
    
    import * as Kek from 'test';
    
    
  Incorrect: 
  
    import {
      a
    } from 'test'
    
    
    import { a,
      b
    } from 'test';
    
    
    
  Custom imports number:

    "multiline-import": [true, 3] // default is 2
  
