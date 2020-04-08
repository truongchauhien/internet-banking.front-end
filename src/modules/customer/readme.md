# State Shape
_Domain data_: data that the application needs to show, use, or modify.  
_App state_: data that is specific to the application's behavior.  
_UI state_: data that represents how the UI is currently displayed.  
  
__You should define your state shape in terms of your domain data and app state, not your UI component tree.__  

# Reducer and Action
One action can be handled by many, one or none of reducers.  
One reducer can handle many action.  

# Folder Structering
Rails-style: separate folders for "action", "constants", "reducers", "containers", and "components".  
Domain-style: separate folders per feature or domain, possibly with sub-folders per file type.  
"Ducks": similar to domain style, but explicitly tying together actions and reducers, often by defining them in the same file.  
