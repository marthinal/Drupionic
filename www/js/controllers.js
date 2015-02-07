angular.module('ngDrupalGap.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
  // LOGIN Controller.
.controller('LoginCtrl', function($scope, $state, loginService) {
  $scope.login = function(user) {
    var login = loginService.login(user)
      // Go to "My account"
      .then(function(data) {
        $state.go('tab.account');
      })
      // WRONG Credentials. TODO remove the alert. Added for test reasons.
      .catch(function(response) {
        alert('Fail!');
      });
  };
});
