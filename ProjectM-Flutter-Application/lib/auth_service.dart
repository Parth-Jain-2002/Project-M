import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:projectm/login_page.dart';
import 'package:projectm/splash_screen.dart';
import 'package:projectm/wecome_page.dart';
class AuthService{
    handleAuthState() {
    return StreamBuilder(
        stream: FirebaseAuth.instance.authStateChanges(),
        builder: (BuildContext context, snapshot) {
          if (snapshot.hasData) {
            return WelcomePage(email: FirebaseAuth.instance.currentUser!.email!);
          } else {
            // ignore: prefer_const_constructors
            return  SplashScreen();
          }
        });
  }

signInWithGoogle() async {
    // Trigger the authentication flow
    final GoogleSignInAccount? googleUser = await GoogleSignIn(
        scopes: <String>["email"]).signIn();

    // Obtain the auth details from the request
    final GoogleSignInAuthentication googleAuth = await googleUser!.authentication;

    // Create a new credential
    final credential = GoogleAuthProvider.credential(
      accessToken: googleAuth.accessToken,
      idToken: googleAuth.idToken,
    );

    // Once signed in, return the UserCredential
    return await FirebaseAuth.instance.signInWithCredential(credential);
  }
   //Sign out
  signOut() {
    FirebaseAuth.instance.signOut();
  }
}