import 'package:flutter/material.dart';

class ImageSlider extends StatefulWidget {
  const ImageSlider({super.key});
  @override
  State<ImageSlider> createState() => _ImageSliderState();
}

class _ImageSliderState extends State<ImageSlider> {
  final PageController _ctrl = PageController();
  int _page = 0;
  final images = [
    'assets/images/slider1.jpg',
    'assets/images/6.png',
    'assets/images/6.png',
  ];

  @override
  Widget build(BuildContext context) {
    final h = MediaQuery.sizeOf(context).height;
    final sliderH = h * (MediaQuery.sizeOf(context).width > 900 ? .45 : .30);
    return Column(
      children: [
        SizedBox(
          height: sliderH,
          child: PageView.builder(
            controller: _ctrl,
            itemCount: images.length,
            onPageChanged: (i) => setState(() => _page = i),
            itemBuilder:
                (_, i) => Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(30),
                    child: Image.asset(images[i], fit: BoxFit.cover),
                  ),
                ),
          ),
        ),
        const SizedBox(height: 12),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children:
              images
                  .asMap()
                  .entries
                  .map(
                    (e) => AnimatedContainer(
                      duration: const Duration(milliseconds: 300),
                      width: _page == e.key ? 24 : 10,
                      height: 10,
                      margin: const EdgeInsets.symmetric(horizontal: 4),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(5),
                        color: _page == e.key ? Colors.purple : Colors.grey,
                      ),
                    ),
                  )
                  .toList(),
        ),
      ],
    );
  }
}
