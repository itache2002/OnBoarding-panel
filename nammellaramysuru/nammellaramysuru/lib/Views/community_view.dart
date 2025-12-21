import 'package:flutter/material.dart';
import 'package:nammellaramysuru/responsive_layout.dart';

class CommunityView extends StatelessWidget {
  const CommunityView({super.key});

  @override
  Widget build(BuildContext context) {
    final layout = ResponsiveLayout.getLayout(context);
    return Scaffold(
      appBar: AppBar(title: const Text('Community')),
      body: Center(
        child: Text(
          'Community Page – $layout layout',
          style: const TextStyle(fontSize: 24),
        ),
      ),
    );
  }
}
