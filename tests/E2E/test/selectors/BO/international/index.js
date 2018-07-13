module.exports =Object.assign(
  {
    InternationalPage: {
      success_panel: '//*[@class="alert alert-success"]',
    }
  },
  require('./taxes'),
  require('./translations'),
  require('./localization')
);
