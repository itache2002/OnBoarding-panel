import 'package:flutter/material.dart';

class ResponsiveLayout {
  static String getLayout(BuildContext context) {
    final w = MediaQuery.sizeOf(context).width;
    if (w > 1200) return 'desktop';
    if (w > 900) return 'laptop';
    if (w > 600) return 'tablet';
    return 'mobile';
  }
}
