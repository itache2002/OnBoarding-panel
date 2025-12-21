import 'package:flutter/material.dart';
import 'package:get/get.dart';

class DrawerMenu extends StatelessWidget {
  const DrawerMenu({super.key});

  @override
  Widget build(BuildContext context) {
    final items = [
      'Events',
      'Community',
      'Leaderboards',
      'About Us',
      'Privacy',
      'Contact',
      'Login',
    ];
    return Drawer(
      backgroundColor: const Color(0xFFD8E3DC),
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          const DrawerHeader(child: Center(child: FlutterLogo(size: 80))),
          ...items.map(
            (i) => ListTile(
              title: Text(
                i,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                  color: Color(0xFF0D4A53),
                ),
              ),
              onTap: () {
                Get.back();
                if (i == 'Community') Get.toNamed('/community');
              },
            ),
          ),
        ],
      ),
    );
  }
}
