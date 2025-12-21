import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../constants/controller_constants.dart';

class SearchAndCategorySection extends StatelessWidget {
  final String layout;
  final ValueChanged<String>? onSearch;
  const SearchAndCategorySection({
    super.key,
    required this.layout,
    this.onSearch,
  });

  bool get isMobile => layout == 'mobile';

  static const categories = [
    {'icon': 'assets/images/icons/1.png', 'label': 'Cultural'},
    {'icon': 'assets/images/icons/2.png', 'label': 'Wellness'},
    {'icon': 'assets/images/icons/3.png', 'label': 'Workshops'},
    {'icon': 'assets/images/icons/4.png', 'label': 'Causes'},
    {'icon': 'assets/images/icons/5.png', 'label': 'Entertainment'},
    {'icon': 'assets/images/icons/6.png', 'label': 'Family'},
    {'icon': 'assets/images/icons/7.png', 'label': 'Business'},
    {'icon': 'assets/images/icons/8.png', 'label': 'Spirituality'},
  ];

  static const filters = [
    'All events',
    'My events',
    'This Week ',
    'Next Week ',
    'This Month',
    'Next Month',
  ];

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 1200),
      child: Column(
        children: [
          Center(
            child: Container(
              height: 50,
              width: 600,
              decoration: BoxDecoration(
                color: const Color(0xFFD8E3DC),
                borderRadius: BorderRadius.circular(30),
              ),
              child: Row(
                children: const [
                  Expanded(
                    child: Padding(
                      padding: EdgeInsets.symmetric(horizontal: 16),
                      child: TextField(
                        decoration: InputDecoration(
                          hintText: "Search Here",
                          border: InputBorder.none,
                        ),
                      ),
                    ),
                  ),
                  Icon(Icons.mic, color: Colors.grey),
                  SizedBox(width: 16),
                ],
              ),
            ),
          ),
          const SizedBox(height: 30),
          Padding(
            padding: EdgeInsets.zero,
            child: Wrap(
              alignment: WrapAlignment.start,
              spacing: 0,
              runSpacing: 0,
              children:
                  categories
                      .map(
                        (cat) => SizedBox(
                          width: 150,
                          child: _CategoryItem(cat: cat),
                        ),
                      )
                      .toList(),
            ),
          ),
          const SizedBox(height: 30),
          Obx(
            () =>
                homeCtrl.isEvent.value
                    ? Center(
                      child: Wrap(
                        alignment: WrapAlignment.center,
                        spacing: 80,
                        runSpacing: 30,
                        children:
                            filters
                                .map(
                                  (btnText) => ElevatedButton(
                                    onPressed: () {},
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: const Color(0xFFD8E3DC),
                                      padding: const EdgeInsets.symmetric(
                                        horizontal: 20,
                                        vertical: 16,
                                      ),
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(15),
                                      ),
                                      elevation: 0,
                                    ),
                                    child: Text(
                                      btnText,
                                      style: const TextStyle(
                                        color: Color(0xFF046777),
                                        fontSize: 18,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                )
                                .toList(),
                      ),
                    )
                    : SizedBox(),
          ),
          /*Obx(() => homeCtrl.isAi.value
                    ? Container(
                        color: envPrimaryColor,
                 
                      )
                    : SizedBox()),*/
        ],
      ),
    );
  }
}

class _CategoryItem extends StatelessWidget {
  final Map<String, dynamic> cat;
  const _CategoryItem({required this.cat});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Material(
          color: const Color(0xFFD8E3DC),
          borderRadius: BorderRadius.circular(10),
          elevation: 4,
          child: InkWell(
            borderRadius: BorderRadius.circular(10),
            onTap: () {},
            child: Padding(
              padding: const EdgeInsets.all(14),
              child: Image.asset(cat['icon']!, width: 62, height: 62),
            ),
          ),
        ),
        const SizedBox(height: 6),
        Text(
          cat['label']!,
          style: const TextStyle(
            color: Color(0xFF046777),
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
      ],
    );
  }
}
