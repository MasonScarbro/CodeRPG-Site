## Documentation

This is an example of how to comunicate with the server when making a game for the site:

views.py:
```py
def update_MarkComplete_Game(request):
    if request.method == 'POST':
        profile = Profile.objects.get(user=request.user) #profile object
        markComplete_1 = True; #level context from the profile
        profile.markComplete_1 = markComplete_1
        profile.add_skill('The Basics')
        profile.save()
        response_data = {'markComplete_1': markComplete_1}
        return JsonResponse(response_data)
```

how one might communicate with the server to make sure a user cant click a mark complete button again
```js
markComplete.setAttribute('disabled', 'disabled'); // makes disabled as soon as clicked
$.ajax({
            type: 'POST',
            url: 'update_MarkComplete_Game',
            headers: {'X-CSRFToken': csrftoken},
            data: {'markComplete_1': markComplete_1},
            success: function(response) {
                if (markComplete_1.response) {
                    // console.log(markComplete_1) - TESTING
                    markComplete.setAttribute('disabled', 'disabled');
                }
                console.log(response)
            },
            error: function(error) {
                console.log(error)
                // Handle errors here
            }
        
        });
```

and how one might change the level

game.js:
```js
$.ajax({
        type: 'POST',
        url: 'update-level',
        headers: {'X-CSRFToken': csrftoken},
        data: {'level': level},
        success: function(response) {
            console.log(response)
        },
        error: function(error) {
            console.log(error)
            // Handle errors here
        }
    
    });

```
views.py:
```py
def update_level(request):
    if request.method == 'POST':
        profile = Profile.objects.get(user=request.user) #profile object
        level = profile.level + 1 #level context from the profile
        profile.level = level
        profile.save()

        response_data = {'level': level}
        return JsonResponse(response_data)
```