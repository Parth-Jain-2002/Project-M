// ignore_for_file: prefer_const_constructors

import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:projectm/auth_controller.dart';
import 'package:projectm/auth_service.dart';
import 'package:firebase_auth/firebase_auth.dart';

class SignUpPage extends StatelessWidget {
  const SignUpPage({super.key});

  @override
  Widget build(BuildContext context) {
    var emailController = TextEditingController();
    var passwordController = TextEditingController();
    List images = ["f.png", "g.png", "t.png"];
    double w = MediaQuery.of(context).size.width;
    double h = MediaQuery.of(context).size.height;
    return Scaffold(
        resizeToAvoidBottomInset:
            true, //To adjust the screen when keyboard opens in mobile

        backgroundColor: Colors.white, //Background color of the screen to white

        body: SingleChildScrollView(
          //To make the screen scrollable & avoid overflow & it contains a single child

          child: Column(
            //Column widget is used to arrange the children vertically

            mainAxisSize:
                MainAxisSize.min, //To make the column shrink wrap its children
            //List of widgets to be displayed vertically---->
            children: [
              Container(
                  //Image Container
                  width: w, //Sets the width of the container
                  height: h * 0.3, //Sets the height of the container

                  decoration: const BoxDecoration(
                      //Decoration widget is used to decorate the container.BoxDecoration is an immutable description of how to paint a box. Here, it's being used to add an image to the Container.

                      //Adding image to the container
                      image: DecorationImage(
                          image: AssetImage('assets/img/signup.png'),
                          fit:
                              BoxFit.cover //To make the image fit the container
                          )),
                  child: Column(
                    children: [
                      SizedBox(
                        height: h * 0.18,
                      ),
                      CircleAvatar(
                        backgroundColor: Colors.white70,
                        radius: 40,
                        backgroundImage: AssetImage("assets/img/profile1.png"),
                      )
                    ],
                  )),
              Container(
                //Middle Container containing text fields
                margin: const EdgeInsets.only(
                    left: 20, right: 20), //Sets the margin of the container
                width: w,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(
                      height: 40,
                    ),
                    Container(
                      //Text Box 1
                      decoration: BoxDecoration(
                          //Decorating the box 1
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(30),
                          boxShadow: [
                            BoxShadow(
                                blurRadius: 10,
                                spreadRadius: 7,
                                offset: const Offset(1, 1),
                                color: Colors.grey.withOpacity(0.2))
                          ]),
                      child: TextField(
                        //Text field of Box 1
                        controller: emailController,
                        decoration: InputDecoration(
                            hintText: "Email",
                            prefixIcon: Icon(
                              Icons.email,
                              color: Colors.deepOrangeAccent,
                            ),
                            focusedBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(30),
                                borderSide: const BorderSide(
                                    color: Colors.white, width: 1.0)),
                            enabledBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(30),
                                borderSide: const BorderSide(
                                    color: Colors.white, width: 1.0)),
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(30))),
                      ),
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    Container(
                      //Text Box 2
                      decoration: BoxDecoration(
                          //Decorating the box 2
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(30),
                          boxShadow: [
                            BoxShadow(
                                blurRadius: 10,
                                spreadRadius: 7,
                                offset: const Offset(1, 1),
                                color: Colors.grey.withOpacity(0.2))
                          ]),
                      child: TextField(
                        // Text field of Box 2
                        controller: passwordController,
                        obscureText: true,
                        decoration: InputDecoration(
                            hintText: "Password",
                            prefixIcon: Icon(
                              Icons.password_outlined,
                              color: Colors.deepOrangeAccent,
                            ),
                            focusedBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(30),
                                borderSide: const BorderSide(
                                    color: Colors.white, width: 1.0)),
                            enabledBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(30),
                                borderSide: const BorderSide(
                                    color: Colors.white, width: 1.0)),
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(30))),
                      ),
                    ),
                    SizedBox(
                      height: 20,
                    ),
                  ],
                ),
              ),
              SizedBox(
                height: 70,
              ),
              GestureDetector(
                onTap: () {
                  AuthController.instance.register(emailController.text.trim(),
                      passwordController.text.trim());
                },
                child: Container(
                    //Image Container
                    width: w * 0.5, //Sets the width of the container
                    height: h * 0.08, //Sets the height of the container

                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(30),
                        //Adding image to the container
                        image: DecorationImage(
                            image: AssetImage('assets/img/loginbtn.png'),
                            fit: BoxFit
                                .cover //To make the image fit the container
                            )),
                    child: Center(
                      child: Text(
                        "Sign Up",
                        style: TextStyle(
                            fontSize: 36,
                            color: Colors.white,
                            fontWeight: FontWeight.bold),
                      ),
                    )),
              ),
              SizedBox(
                height: 10,
              ),
              RichText(
                  text: TextSpan(
                      recognizer: TapGestureRecognizer()
                        ..onTap = () => Get.back(),
                      text: "Already have an account?",
                      style: TextStyle(fontSize: 20, color: Colors.grey[500]))),
              SizedBox(
                height: w * 0.2,
              ),
              RichText(
                text: TextSpan(
                  text: "Sign Up using one of the following methods",
                  style: TextStyle(
                      fontSize: 16,
                      color: Colors.black,
                      fontWeight: FontWeight.bold),
                ),
              ),
              Wrap(
                children: List<Widget>.generate(3, //No. of Icons/images
                    (index) {
                  //index is the iterator
                  return Padding(
                    padding:
                        const EdgeInsets.all(10.0), //For gap between the icons
                    child: CircleAvatar(
                      radius: 30, //outer circle
                      backgroundColor: Colors
                          .grey[500], //color between outer and inner circle
                      child: index == 1
                          ? GestureDetector(
                              onTap: () {
                                AuthService().signInWithGoogle();
                                
                                AuthController.instance.register(emailController.text.trim(),
                      passwordController.text.trim());
                                // Add your onTap logic here for index=1 image
                              },
                              child: CircleAvatar(
                                radius: 25, //inner circle
                                backgroundImage: AssetImage(
                                  // ignore: prefer_interpolation_to_compose_strings
                                  "assets/img/" +
                                      images[
                                          index], //giving the path of the images.List is created in the begining.
                                ),
                              ),
                            )
                          : CircleAvatar(
                              radius: 25, //inner circle
                              backgroundImage: AssetImage(
                                // ignore: prefer_interpolation_to_compose_strings
                                "assets/img/" +
                                    images[
                                        index], //giving the path of the images.List is created in the begining.
                              ),
                            ),
                    ),
                  );
                }),
              )
            ],
          ),
        ));
  }
}
