import 'package:flutter/material.dart';
import 'package:nammellaramysuru/responsive_layout.dart';

class EventDetailView extends StatelessWidget {
  const EventDetailView({super.key});

  @override
  Widget build(BuildContext context) {
    final layout = ResponsiveLayout.getLayout(context);
    return Scaffold(
      appBar: AppBar(title: const Text('Event Detail')),
      body: Center(
        child: Text(
          'Event Detail Page – $layout layout',
          style: const TextStyle(fontSize: 24),
        ),
      ),
    );
  }
}
