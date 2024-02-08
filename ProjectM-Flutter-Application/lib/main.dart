import 'dart:async';

import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:projectm/auth_controller.dart';
import 'package:projectm/auth_service.dart';
import 'package:projectm/login_page.dart';
import 'package:projectm/signup_page.dart';
import 'package:projectm/splash_screen.dart';
import 'package:projectm/wecome_page.dart';
import 'package:get/get.dart';
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();//Initializing the binding between the flutter and the platform specific UI Library Firebase
  await Firebase.initializeApp().then((value) => Get.put(AuthController()));//Initializing the firebase and then putting the AuthController
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    
    return GetMaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      
      home: AuthService().handleAuthState(),
    );
  }
}
