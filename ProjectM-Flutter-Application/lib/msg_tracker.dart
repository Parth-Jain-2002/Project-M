import 'package:flutter/material.dart';
import 'package:flutter_sms_inbox/flutter_sms_inbox.dart';
import 'package:permission_handler/permission_handler.dart';

class SmsTracker extends StatefulWidget {
  @override
  _SmsTrackerState createState() => _SmsTrackerState();
}

class _SmsTrackerState extends State<SmsTracker> {
  final SmsQuery _query = SmsQuery();
  List<SmsMessage> _allMessages = [];
  List<SmsMessage> _financialMessages = [];

  @override
  void initState() {
    super.initState();
    retrieveAllMessages();
  }

  retrieveAllMessages() async {
    var permission = await Permission.sms.status;
    if (permission.isGranted) {
      final messages = await _query.getAllSms;
      setState(() {
        _allMessages = messages;
      });
      filterFinancialMessages();
    } else {
      await Permission.sms.request();
    }
  }

  filterFinancialMessages() {
    List<SmsMessage> financialMessages = [];
    
    for (var message in _allMessages) {
      print(message.body);
      if (message.body!.toLowerCase().contains('credited') ||
          message.body!.toLowerCase().contains('debited')) {
        financialMessages.add(message);
      }
    }

    setState(() {
      _financialMessages = financialMessages;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter SMS Inbox App',
      theme: ThemeData(
        primarySwatch: Colors.teal,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: const Text('SMS Tracker'),
        ),
        body: Container(
          padding: const EdgeInsets.all(10.0),
          child: _financialMessages.isNotEmpty
              ? _MessagesListView(
                  messages: _financialMessages,
                )
              : Center(
                  child: Text(
                    'No messages to show.\n Tap refresh button...',
                    style: Theme.of(context).textTheme.headlineSmall,
                    textAlign: TextAlign.center,
                  ),
                ),
        ),
      ),
    );
  }
}

class _MessagesListView extends StatelessWidget {
  const _MessagesListView({
    Key? key,
    required this.messages,
  }) : super(key: key);

  final List<SmsMessage> messages;

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      shrinkWrap: true,
      itemCount: messages.length,
      itemBuilder: (BuildContext context, int i) {
        var message = messages[i];

        // Extract additional details from the message body and bring it in a map
        //var msgDetails = extractDetails(message.body);
        
        return Card(
          child: Column(
            children: [
              ListTile(
                leading: CircleAvatar(
                  // Use the first two letters of the sender's name
                  child: Text(message.sender?.substring(0, 2) ?? ''),
                ),
                title: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(message.sender ?? ''),
                    Text(
                      message.date?.toString() ?? '',
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.grey,
                      ),
                    ),
                  ],
                ),
                // subtitle: Text(msgDetails['entityName'] ?? ''),
                // trailing: Text(msgDetails['amount'] ?? ''),
              ),
              Text(message.body ?? ''),
            ],
          ),
        );
      },

    );
  }

  extractDetails(String? messageBody){
    var msgDetails = {
      'entityName': '',
      'isCredited': false,
      'amount': '',
    };
    

    // Check if the message is from ICICI Bank
    if (messageBody!.toLowerCase().contains('icici bank')) {
      msgDetails = extractDetailsFromIciciBank(messageBody);
    }

    return msgDetails;
  }

  extractDetailsFromIciciBank(String? messageBody){
    // ICICI Bank Acct XX499 debited for Rs 476.70 on 09-Jul-23; Zomato Ltd credited. UPI:355651891355. Call 18002662 for dispute. SMS BLOCK 499 to 9215676766.
    // We have credited your ICICI Bank Account XX499 with INR 12,500.00 on 03-Jul-23. Info:INF*INFT*032775256931*Isthar. The Available Balance is INR 57,145.35.

    var msgDetails = {
      'entityName': '',
      'isCredited': false,
      'amount': '',
    };

    // Check if the message is a credit message
    if (messageBody!.toLowerCase().contains('debited')) {
      msgDetails['isCredited'] = false;

      // Extract the entity name: Zomato Ltd
      RegExp regex = new RegExp(r'(?<=; ).*?(?= credited)');
      var entityName = regex.firstMatch(messageBody)?.group(0);
      msgDetails['entityName'] = entityName!;
      
      regex = new RegExp(r'(?<=debited for Rs ).*?(?= on)');
      var amount = regex.firstMatch(messageBody)?.group(0);
      msgDetails['amount'] = amount!;

      return msgDetails;
    }
    else{
      msgDetails['isCredited'] = true;
      return msgDetails;
    }
  }

}
