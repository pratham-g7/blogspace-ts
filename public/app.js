function showReg() {
  $(".regMsg").hide()
  $(".userInput").show()

}
function showMsg() {
  $(".regMsg").show()
  $(".userInput").hide()
}


$(document).ready(() => {
  const user = localStorage.getItem("BLOGSPACE_USER")
  if (!user){
      $(".userInput").show()
      
  } else {
    $(".regMsg").text(`Registered as: ${user}`)
    $(".regMsg").show()
  }
  $("#usernameInput").val(user || "Anonymous");

  $("#pageName").text(""); 
  const title = "BlogSpace";
  let i = 0;

  function type() {
    if (i < title.length) {
      $("#pageName").append(title.charAt(i));
      i++;
      setTimeout(type, 150);
    } else {$("#pageName").removeClass("typing");}
  }

  type();

  $(".addCmnt").click(function () {
    $(this).parent().find(".commentForm-div").toggleClass("hidden");
  });

  $(".addPostBtn").click(() => {
    $("#newPost").toggleClass("hidden");
  });

  $(document).click((event) => {
    if (!$(event.target).closest("#newPost, .addPostBtn").length) {
      $("#newPost").addClass("hidden");
    }
  });

  const updateCounter = (inputSelector, counterSelector, max) => {
    $(inputSelector).on("input", function () {
      const count = $(this).val().length;
      if (count === max) {
        $(counterSelector).css("color", "red")
      } else {
        $(counterSelector).css("color", "grey")
      }
      $(counterSelector).text(`${count}/${max}`);
    });

    const initialCount = $(inputSelector).val().length;
    $(counterSelector).text(`${initialCount}/${max}`);
  };

  updateCounter('#userBox', '#username-counter', 10)
  updateCounter('.postName', '#title-counter', 30);
  updateCounter('#postContent', '#content-counter', 500);

  $(".postDel").on("click", function () {
      const postId = $(this).data("id");

      fetch(`/posts/delete/${postId}`, {
        method: "DELETE"
      })
      .then(response => {
        if (response.ok) {
          $(this).closest("li").remove();
        } else {
          console.error("Failed to delete");
        }
      })
      .catch(err => console.error("Error:", err));
    });
  });
function setUsername(event) {
  event.preventDefault();
  const name = event.target.setName.value.toLowerCase()
  $(".regMsg").text(`Registered as: ${name}`)
  showMsg()
  localStorage.setItem("BLOGSPACE_USER", name)
}
