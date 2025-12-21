import 'package:flutter/material.dart';
import 'package:nammellaramysuru/constants/controller_constants.dart';

class DesktopMenu extends StatelessWidget {
  final String layout;
  const DesktopMenu({super.key, required this.layout});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 50,
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      decoration: BoxDecoration(
        color: const Color(0xFFD8E3DC),
        borderRadius: BorderRadius.circular(30),
      ),
      child: LayoutBuilder(
        builder:
            (_, c) => Row(
              children: [
                const Spacer(flex: 6),
                ...[
                  'Events',
                  'Community',
                  'Leaderboards',
                ].map((t) => _menuText(t, layout)),
                const Spacer(flex: 6),
                ...[
                  'About Us',
                  'Privacy',
                  'Contact',
                ].map((t) => _menuText(t, layout)),
                const Spacer(flex: 3),
                ...['Login'].map((t) => _menuText(t, layout)),
                const Spacer(flex: 1),
              ],
            ),
      ),
    );
  }

  Widget _menuText(String t, String layout) => Padding(
    padding: const EdgeInsets.symmetric(horizontal: 20),
    child: InkWell(
      onTap: () {
        // if (t == "Community") Get.toNamed('/community');
        if (t == "Community") {
          homeCtrl.isEvent.value = false;
          homeCtrl.loadCommunities();
        } else {
          homeCtrl.isEvent.value = true;
          homeCtrl.loadEvents();
        }
      },
      child: Text(
        t,
        style: const TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 16,
          color: Color(0xFF0D4A53),
        ),
      ),
    ),
  );
}
