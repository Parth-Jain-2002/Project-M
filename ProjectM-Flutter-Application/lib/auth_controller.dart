// ignore_for_file: empty_catches, prefer_const_constructors, avoid_print

import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:projectm/login_page.dart';
import 'package:projectm/wecome_page.dart';

class AuthController extends GetxController {
  //AuthController.instance
  static AuthController instance = Get.find();
  //it contains email,password,username
  late Rx<User?>
      _user; //late is used as we are just declaring it and not assigning any value
  FirebaseAuth auth = FirebaseAuth.instance;
  @override
  void onReady() {
    super.onReady();
    _user =
        Rx<User?>(auth.currentUser); //getting the current user from firebase
    //Our user will be notified whenever there is a change in the user---->>
    _user.bindStream(auth
        .authStateChanges()); //binding the stream to listen to the changes in the user
    ever(_user,
        _initialScreen); //ever is used to listen to the changes in the user and initialScreen is called for the same
  }

  _initialScreen(User? user) {
    if (user == null) {
      print('Login Page');
      Get.offAll(() => LoginPage());
    } else {
      Get.offAll(() => WelcomePage(email: user.email!));//! is becz it is required in welcome page
    }
  }

  Future<void> register(String email, password) async {
    try {
      await auth.createUserWithEmailAndPassword(email: email, password: password);
    } catch (e) {
      Get.snackbar("About User", "User Message",
          backgroundColor: Colors.redAccent,
          snackPosition: SnackPosition.BOTTOM,
          titleText: Text(
            "Account Cration Failed",
            style: TextStyle(color: Colors.white),
          ),
          messageText: Text(
            e.toString(), 
            style: TextStyle(color: Colors.white)
            )
          );
    }
  }
  Future<void> login(String email, password) async {
    try {
      await auth.signInWithEmailAndPassword(email: email, password: password);
    } catch (e) {
      Get.snackbar("About Login", "Login Message",
          backgroundColor: Colors.redAccent,
          snackPosition: SnackPosition.BOTTOM,
          titleText: Text(
            "Login Failed",
            style: TextStyle(color: Colors.white),
          ),
          messageText: Text(
            e.toString(), 
            style: TextStyle(color: Colors.white)
            )
          );
    }
  }
  void logout() async {
    await auth.signOut();
  }
}
