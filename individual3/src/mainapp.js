/*<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- CSS only -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
  <!-- JavaScript Bundle with Popper -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
    crossorigin="anonymous"></script>
  <link rel="stylesheet" href="school.css" />

  <!-- cdn -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
    integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
  <title>Document</title>
</head>

<body>  

  <main id="newApp">

    <!---checkout btn and search btn-->
    <nav class="navbar navbar-light bg-danger">
      <div class="container-fluid">

        <div class="col-md-5 ml-5">
          <form>
            <input class="form-control" type="search" placeholder="Search" aria-label="Search" v-model="searchPrompt" />
          </form>
        </div>
        <div class="col-md-2">
          <button v-if="cartItem <= 0" type="button" v-bind:class="cartIcon" class="btn btn-warning px-2 disabled"> No
            item in cart</button>
          <button v-else type="button" v-on:click="showButton" v-bind:class="cartIcon" class="btn btn-warning px-2">
            <span v-if="showContent">
              Go to cart {{ cartItem }}
            </span>
            <span v-else>
              Go back to home
            </span>
          </button>
        </div>
    </nav>
    <!----->

    <h1 class="text-center pt-3">{{ sitename }}</h1>
    <div v-if="showContent" class="lessonSpace">


      <div class="row">
        <!-- main content -->
        <div class="col-md-10">
          <div id="lessonSection" class="row">
            <div class="col-md-6 col-lg-4" v-for="lesson in lessons" :key="lesson.id">
              <div class="card mb-2 cards">
                <img :src="imageUrl + lesson.img" alt="lesson.subject" class="card-img-top">
                <div class="card-text mb-0 d-flex justify-content-end">
                  <i v-bind:class="lesson.icon" class="fa-2x"></i>
                </div>
                <div class="card-body">

                  <b>Subject:</b> {{ lesson.subject }}
                  <div class="card-text mb-0"> <b>Location :</b>{{ lesson.location }}</div>
                  <div class="card-text mb-0"> <b>Price :</b>{{ lesson.price }}</div>
                  <div class="card-text mb-0"> <b>Spaces :</b>{{ lesson.spaces }}</div>
                </div>
                <!---find a way to map, shopping cart vue js functionality-->
                <button type="button" class="btn btn-warning" v-on:click="addToCart(lesson)"
                  v-if="canAddToCart(lesson)">Add to
                  cart</button>
                <button v-else>Add to cart</button>
              </div>

              <span v-if="lesson.spaces - cartCount(lesson.id) === 0">
                All Out!
              </span>

              <span v-else-if="lesson.spaces - cartCount(lesson.id) < 5">
                Only {{ lesson.spaces }} items left!!
              </span>
              <span v-else>
                Buy Now!!!
              </span>

            </div>
          </div>
        </div>
        <!-- filter section -->
        <div class="col-md-2">
          <div class="row">
            <div class="col-md-6">
              <select v-model="sortFeature" class="form-control">
                <option disabled>Sort</option>
                <option value="subject">Subject</option>
                <option value="price">Price</option>
                <option value="location">Location</option>
                <option value="availability">Availabilty</option>
              </select>
            </div>
            <div class="col-md-6">
              <select v-model="sortOption" class="form-control">
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- cart page -->
    <div v-else>
      <div class="row" id="cartSection">
        <div class="col-md-6 col-lg-4" v-for="cartItem in cart">
          <div class="card mb-2 cards">
            <img :src="imageUrl + cartItem.lesson.img" alt="cartItem.lesson.subject" class="card-img-top">
            <div class="card-text mb-0">
              <i v-bind:class="cartItem.lesson.icon" class="fa-2x"></i>
            </div>
            <div class="card-body">

              <h5 class="card-title"> <b>Subject :</b>{{ cartItem.lesson.subject }}
            </div>
            <div class="card-text mb-0"><b>Location :</b>{{ cartItem.lesson.location }}</div>
            <div class="card-text mb-0"><b>Price :</b>{{ cartItem.lesson.price }}</div>
            <div class="card-text mb-0"><b>Spaces :</b>{{ cartItem.spaces }}</div>
            <!---find a way to map, shopping cart vue js functionality-->
            <button class="btn btn-warning" v-on:click="removeCart(cartItem.lessonId)">Remove from cart</button>
          </div>
        </div>

        <div class="row">
         
          <h2>Checkout Details</h2>
          <div class="col-md-4">
            <label for="name">Name</label><br />
            <input type="text" v-model.trim="nameInput" placeholder="Name" name="name" id="naming">
          </div>

          <div class="col-md-4">
            <label for="name">Number</label><br />
            <input type="text" v-model.number="numberInput" placeholder="Phone Number" name="phone" id="numbering">
          </div>

          <p> </p>
          <div class="col-md-4">
            <button class="btn btn-primary" v-on:click="checkOut()">Checkout</button>
            <p>Status: {{ message }}</p>
          </div>

        </div>

      </div>
    </div>
    </div>
    <!-- to create a custom search filter, use a computed propertty -->
    </div>

    </div>

    </div>
  </main>

  <script src="https://unpkg.com/vue@2.7.8/dist/vue.js"></script>
  <!---- <script>
 
     let app = new Vue({
       // el: "#newApp",
       data() {
         lessons : []
         // return {
           
         //  lesson: {
         //   id: 1000,
         //   subject: "English",
         //   location: "Hendon",
         //   price: 2000,
         //   image: "subjectPic/english.jpg",
 
         //   disable: false,
         //   spaces: 5,
         //   showContent: true,
         //   name: "",
         //   phoneNumber: "",
         //   lessons : []
         // }
       // }
       },
       created() {
         fetch("http://localhost:4500/collections/products")
         .then((response)=> {
           response.json();
         })
         .then((lessons)=> {
         this.lessons = lessons;
         })
       }
     })
 
   </script>---->
  
 
   <script type="module" src="main.js"></script>
   
</body>

</html> */