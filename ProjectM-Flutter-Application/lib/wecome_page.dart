// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';

class WelcomePage extends StatelessWidget {
  const WelcomePage({super.key});

  @override
  Widget build(BuildContext context) {
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
              SizedBox(
                height: 70,
              ),
              Container(
                width: w,
                margin:const EdgeInsets.only(left: 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "Welcome :-)",
                      style: TextStyle(
                          fontSize: 36,
                          fontWeight: FontWeight.bold,
                          color: Colors.black54),
                    ),
                    Text(
                      "sample@gmai.com",
                      style: TextStyle(fontSize: 18, color: Colors.grey[500]),
                    )
                  ],
                ),
              ),
              SizedBox(
                height: 200,
              ),
              Container(
                  //Sign Out Button  Container
                  width: w * 0.5, //Sets the width of the container
                  height: h * 0.08, //Sets the height of the container

                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(30),
                      //Adding image to the container
                      image: DecorationImage(
                          image: AssetImage('assets/img/loginbtn.png'),
                          fit:
                              BoxFit.cover //To make the image fit the container
                          )),
                  child: Center(
                    child: Text(
                      "Sign Out",
                      style: TextStyle(
                          fontSize: 36,
                          color: Colors.white,
                          fontWeight: FontWeight.bold),
                    ),
                  )),
            ],
          ),
        ));
  }
}
