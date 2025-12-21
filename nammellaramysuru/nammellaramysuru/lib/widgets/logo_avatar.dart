import 'package:flutter/material.dart';

class LogoAvatar extends StatelessWidget {
  const LogoAvatar({super.key});

  @override
  Widget build(BuildContext context) {
    final isMobile = MediaQuery.sizeOf(context).width <= 600;
    return Positioned(
      top: 5,
      child: CircleAvatar(
        radius: isMobile ? 40 : 55,
        backgroundColor: const Color(0xFFD8E3DC),
        child: Image.asset(
          'assets/images/logo.png',
          width: isMobile ? 75 : 105,
          height: isMobile ? 75 : 105,
        ),
      ),
    );
  }
}
