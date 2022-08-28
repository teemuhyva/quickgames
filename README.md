# Snooker and billiard app for quick best of one games

### How this works
Billiard game will be hold in one table at the time. When there is 2 players registered game will be held and it will be best of one format.<br>
Winning player will continue for next game and opponent will be next arriving player.<br>
If winning player has won total of 3 games in row player will be removed from queue and placed in top ten list of that day.<br>

Support snooker format as well and works exactly same way as billiard.<br>

There will be time frame for billiard ( 14:00 - 16:00) and snooker (18:00 - 24:00). When player is added depending on time of day they will be added on correct game format.

### TODO tasks

Following functionalities will be added one by one. Mark task as done when pushed to main branch

[ ] Create code base for react native app and add typescript support

MongoDb
  * [ ] Store new player
  * [ ] Store game where is 2 players
  * [ ] Update player name
  * [ ] Remove player from queue. Add confirmation ( will be swiped on screen )
  * [ ] Retrieve players on top ten list ( should it be shown based on total of wins or only those who will win 3 in row)

View and react native logic
  * [ ] Add player to list and show in listview ( each player shown in Card component)
  * [ ] Add daytime to filter is it billiard or snooker
  * [ ] Add game that contains 2 players ( Game shown in Card component)
  * [ ] Queue for ongoing game
  * [ ] Queue for players waiting
  * [ ] Horizontal line to separate above 
  * [ ] New window with navigation for history. (Hamburger model)


