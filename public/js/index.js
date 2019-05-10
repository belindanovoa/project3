// Get references to page elements
var $commentText = $("#comment-text");
var $commentDescription = $("#comment-description");
var $submitBtn = $("#submit");
var $commentList = $("#comment-list");

// The API object contains methods for each kind of request we'll make
var API = {
  savecomment: function (comment) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/comments",
      data: JSON.stringify(comment)
    });
  },
  getcomments: function () {
    return $.ajax({
      url: "/api/comments",
      type: "GET"
    });
  },
  likecomment: function (id) {
    return $.ajax({
      url: "/api/comments/" + id,
      type: "PUT"
    });
  },
  deletecomment: function (id) {
    return $.ajax({
      url: "/api/comments/" + id,
      type: "DELETE"
    });
  }
};

// refreshcomments gets new comments from the db and repopulates the list
var refreshcomments = function () {
  API.getcomments().then(function (data) {
    var $comments = data.map(function (comment) {
      var $a = $("<span>")
        .text(comment.text + ":  "+ comment.description)
        .attr("span", "/comment/" + comment.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": comment.id,
          "data-text": comment.text,
          "data-description": comment.description,
          "data-like": comment.like
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("x");
      $li.append($button);

      var $likeButton = $("<like-button>")
        .addClass("btn btn-success float-right counter")
        .text(comment.like);
      $li.append($likeButton);

      var $button = $("<button>")
        .addClass("btn btn-info float-right like")
        .text("like");
      $li.append($button);

      return $li;
    });

    $commentList.empty();
    $commentList.append($comments);
  });
};

// handleFormSubmit is called whenever we submit a new comment
// Save the new comment to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var comment = {
    text: $commentText.val().trim(),
    description: $commentDescription.val().trim(),
    PostId: location.pathname.slice(location.pathname.lastIndexOf("/") + 1)
  };

  if (!(comment.text && comment.description)) {
    alert("You must enter an comment text and description!");
    return;
  }

  API.savecomment(comment).then(function () {
    refreshcomments();
  });

  $commentText.val("");
  $commentDescription.val("");
};

// handleDeleteBtnClick is called when an comment's delete button is clicked
// Remove the comment from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deletecomment(idToDelete).then(function () {
    refreshcomments();
  });
};

var handleLikeBtnClick = function () {
  var idToLike = $(this)
    .parent()
    .attr("data-id");
  API.likecomment(idToLike);

  var idToLike2 = $(this)
  .parent()
  .attr("data-like");

  API.likecomment(idToLike2);
  sortLikes(idToLike2);
  refreshcomments();
};


var sortLikes = function (idToLike2) {
    var likesArray = [];
    likesArray.push(idToLike2);
    console.log(likesArray);
}

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$commentList.on("click", ".like", handleLikeBtnClick);
$commentList.on("click", ".delete", handleDeleteBtnClick);


