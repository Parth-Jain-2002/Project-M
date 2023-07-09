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

        // Extract additional details from the message body
        String amount = extractAmount(message.body);
        bool isCredited = message.body!.toLowerCase().contains('credited');
        String entityName = extractEntityName(message.body);

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
                subtitle: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(entityName),
                    Text(
                      isCredited ? 'Credited' : 'Debited',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                trailing: Text(amount),
              ),
              Text(message.body ?? ''),
            ],
          ),
        );
      },

    );
  }

  String extractEntityName(String? messageBody) {
    if (messageBody == null) {
      return '';
    }
  RegExp regExp = RegExp(r'[A-Za-z\s]+(debited|credited)');
  Match? match = regExp.firstMatch(messageBody);
  if (match != null) {
    String entityName = match.group(0) ?? '';
    return entityName.trim();
  }
  return '';
}

String extractAmount(String? messageBody) {
  if (messageBody == null) {
      return '';
    }
  // Amount can be Rs. 500 or Rs 500
  RegExp regExp = RegExp(r'Rs\.?\s?\d+');
  Match? match = regExp.firstMatch(messageBody);
  if (match != null) {
    String amount = match.group(0) ?? '';
    return amount.substring(3);
  }
  return '';
}

}
