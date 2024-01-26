// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  @override
  Widget build(BuildContext context) {
    double w=MediaQuery.of(context).size.width;
    double h=MediaQuery.of(context).size.height;
    return Scaffold(
      resizeToAvoidBottomInset: true,//To adjust the screen when keyboard opens in mobile

      backgroundColor: Colors.white,//Background color of the screen to white

      body:SingleChildScrollView(//To make the screen scrollable & avoid overflow & it contains a single child

        child: Column(//Column widget is used to arrange the children vertically
        
          mainAxisSize: MainAxisSize.min,//To make the column shrink wrap its children
          //List of widgets to be displayed vertically---->
          children: [ 
            Container(//Image Container
              width: w,//Sets the width of the container
              height: h*0.3,//Sets the height of the container
        
              decoration: const BoxDecoration(//Decoration widget is used to decorate the container.BoxDecoration is an immutable description of how to paint a box. Here, it's being used to add an image to the Container.
        
                //Adding image to the container
                image: DecorationImage(
                  image: AssetImage('assets/img/login.png'),
                  fit: BoxFit.cover //To make the image fit the container
                )
              ),
            ),    
            Container(//Middle Container containing text fields
              margin: const EdgeInsets.only(left: 20,right: 20),//Sets the margin of the container
              width: w,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    "Hello",
                    style: TextStyle(
                      fontSize: 60,
                      fontWeight: FontWeight.bold
                    )
                  ),
                  Text(
                      "Sign in to your account",
                      style: TextStyle(
                          fontSize: 20,
                          color: Colors.grey[500]
                      )
                  ),
                  const SizedBox(height: 40,),
                  Container(//Text Box 1
                    decoration: BoxDecoration(//Decorating the box 1
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(30),
                      boxShadow: [
                        BoxShadow(
                          blurRadius: 10,
                          spreadRadius: 7,
                          offset: const Offset(1, 1),
                          color: Colors.grey.withOpacity(0.2)
                        )
                      ]
                    ),
                    child: TextField(//Text field of Box 1
                      decoration: InputDecoration(
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(30),
                          borderSide: const BorderSide(
                            color: Colors.white,
                                width: 1.0
                          )
                        ),
                          enabledBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(30),
                              borderSide: const BorderSide(
                                  color: Colors.black,
                                  width: 1.0
                              )
                          ),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(30)
                        )
                      ),
                    ),
                  ),
                  const SizedBox(height: 20,),
                  Container(//Text Box 2
                    decoration: BoxDecoration(//Decorating the box 2
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(30),
                        boxShadow: [
                          BoxShadow(
                              blurRadius: 10,
                              spreadRadius: 7,
                              offset: const Offset(1, 1),
                              color: Colors.grey.withOpacity(0.2)
                          )
                        ]
                    ),
                    child: TextField(// Text field of Box 2
                      decoration: InputDecoration(
                          focusedBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(30),
                              borderSide: const BorderSide(
                                  color: Colors.white,
                                  width: 1.0
                              )
                          ),
                          enabledBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(30),
                              borderSide: const BorderSide(
                                  color: Colors.white,
                                  width: 1.0
                              )
                          ),
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(30)
                          )
                      ),
                    ),
                  ),
                  SizedBox(height: 20,),
                  Row(//Alligning "Forgot Password?" to the right
                    children: [
                      Expanded(child: Container(),),//To make the container take the remaining space
                      Text(
                          "Forgot Password?",
                          style: TextStyle(
                              fontSize: 20,
                              color: Colors.grey[500]
                          )
                      ),
                    ],
                  ),
                ],
              ),
            ),
            SizedBox(height: 40,),
            Container(//Image Container
              width: w*0.5,//Sets the width of the container
              height: h*0.08,//Sets the height of the container
        
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(30),
                //Adding image to the container
                image: DecorationImage(
                  image: AssetImage('assets/img/loginbtn.png'),
                  fit: BoxFit.cover //To make the image fit the container
                )
              ),
              child: Center(
                child: Text(
                  "Sign In",
                  style: TextStyle(
                    fontSize: 36,
                    color: Colors.white,
                    fontWeight: FontWeight.bold
                  ),
                ),
              )
              ),
            SizedBox(height: w*0.18,),
            RichText(text: TextSpan(
              text: "Don't have an account? ",
              style: TextStyle(
                fontSize: 20,
                color: Colors.grey[500]
              ),
            
            children: [
              TextSpan(
                text: " Create",
                style: TextStyle(
                  fontSize: 20,
                  color: Colors.black,
                  fontWeight: FontWeight.bold
                )
              )
            ]
            ),
            ),
          ],
        ),
      ),
        
        );      
  }
}

