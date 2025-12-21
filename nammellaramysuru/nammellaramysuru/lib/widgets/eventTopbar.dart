import 'package:flutter/material.dart';

class EventTopBar extends StatelessWidget {
  const EventTopBar({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: const Color(0xFF0C6168), width: 2),
      ),
      child: Row(
        children: [
          const Icon(Icons.thumb_up, color: Colors.red),
          const SizedBox(width: 6),
          const Text(
            "10k are interested",
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w600,
              color: Color(0xFF0C6168),
            ),
          ),

          const Spacer(),

          // Social media icons
          _icon(Icons.link),
          _icon(Icons.ondemand_video), // YouTube
          _icon(Icons.facebook),
          _icon(Icons.camera_alt), // Instagram substitute
          _icon(Icons.home),

          // Share
          _icon(Icons.share),

          // Location
          _icon(Icons.location_on),

          // Bookmark
          _icon(Icons.bookmark),
        ],
      ),
    );
  }

  Widget _icon(IconData icon) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 6),
      child: Icon(icon, color: Color(0xFF0C6168), size: 22),
    );
  }
}
