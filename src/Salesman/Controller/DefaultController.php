<?php

namespace Salesman\Controller;

use User\Model\UserModel;

class DefaultController extends \Core\Controller\CompanyController {
    /*
     * @todo Arrumar essa permissão
     */

    public function checkPermission() {
        
    }

    public function indexAction() {

        $this->_userModel = new UserModel();
        $this->_userModel->initialize($this->serviceLocator);
        if ($this->_userModel->loggedIn() && $this->_userModel->getUserCompany()) {            
            return parent::indexAction();
        } elseif ($this->_userModel->loggedIn()) {
            return $this->redirect()->toUrl($this->_renderer->basePath('/salesman/contact-request'));
        } else {
            return \Core\Helper\View::redirectToLogin($this->_renderer, $this->getResponse(), $this->getRequest(), $this->redirect());
        }
    }

}
